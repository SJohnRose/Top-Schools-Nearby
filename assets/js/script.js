var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("search-input");
var optionInputEl = document.getElementById("school-type");
var distCardsDivEl = document.getElementById("dist-cards");
var cardTemplateDivEl = document.getElementById("card-template");
var mapElement = document.getElementById("map");
var dummyMapElement = document.getElementById("dummyMap")
var map = null;



// Function to get data from Google Maps API
function getApi() {
    initMap();
}

// Event listener for the Search button
searchButton.addEventListener('click', getApi);



// Extracting the required temperature, wind and humidity information from weather JSON
function populateData(places, map) {
  if(distCardsDivEl.hasChildNodes()) {
    while(distCardsDivEl.hasChildNodes()) {
      distCardsDivEl.removeChild(distCardsDivEl.firstChild);
    }
  }
  for(var place of places) {
    if (place.geometry && place.geometry.location) {
      addSchool(place, map);
    }
  }
}

// Function to get the school name from results
function addSchool(school, map) {
  const currentLocation = {lat: 0, lng: 0};
  var map = new google.maps.Map(dummyMapElement, {center: currentLocation, zoom: 15});
  service = new google.maps.places.PlacesService(map);
  request = {
    placeId: school.place_id,
    fields: ['name', 'formatted_address', 'photos', 'website']
  }
  service.getDetails(request, addSchoolDetails);
}

// Send school details to HTML div cards
function addSchoolDetails(school, status) {
  if(status === google.maps.places.PlacesServiceStatus.OK) {
    addSchoolElement(school);
  }
}

function addSchoolElement(school) {
  div = document.createElement("div");
  div.setAttribute("class", "column is-one-quarter card mt-5 mr-6 ml-6");  
  div.appendChild(createHeader(school));
  div.appendChild(createCardImage(school));
  div.appendChild(createFooter(school));
  distCardsDivEl.appendChild(div);
}


function createHeader(school) {
  var p1 = document.createElement("p");
  p1.setAttribute("class", "card-header-title");
  var schoolWebsite = document.createElement("a");
  schoolWebsite.setAttribute("href", school.website);
  schoolWebsite.textContent = school.name;
  p1.appendChild(schoolWebsite);
  var header = document.createElement("header");
  header.setAttribute("class", "card-header");
  header.appendChild(p1);
  return header;
}


function createCardImage(school) {
  var figure = document.createElement("figure");
  figure.setAttribute("class", "image is-4by3");
  var img = document.createElement("img");
  if(school.photos) {
    img.setAttribute("src", school.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400}));
  }
  else {
    img.setAttribute("src","https://raisingchildren.net.au/__data/assets/image/0015/102822/Secondary-schools-things-to-consider-narrow.jpg");
  }
  img.setAttribute("alt", "Placeholder image");
  figure.append(img);
  cardImageDiv = document.createElement("div");
  cardImageDiv.setAttribute("class", "card-image");
  cardImageDiv.appendChild(figure);
  return cardImageDiv;
}



function createFooter(school) {
  footer = document.createElement("footer");
  footer.setAttribute("class", "card-footer");
  p1 = document.createElement("p");
  p1.textContent = school.formatted_address;
  footer.append(p1);
  return footer;
}



// Function to initialise map
function initMap() {
  var locationName = cityInputEl.value;
  getLocationData(locationName);
    
}
  
// Get place information using location name
function getLocationData(locationName) {
  var currentLocation = new google.maps.LatLng(-37.840935, 144.946457);
  var map = new google.maps.Map(mapElement, {center: currentLocation, zoom: 15});
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: locationName,
    fields: ['name', 'geometry']
  };
  service.findPlaceFromQuery(request, getSchoolsNearby);
}

// Get schools information from Google maps 
function getSchoolsNearby(results, status) {
  var schoolSelect, schoolType;
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    locationResult = results[0];
    const currentSearchLocation = {lat: locationResult.geometry.location.lat(), lng: locationResult.geometry.location.lng()};
    var map = new google.maps.Map(mapElement, {
      center: locationResult.geometry.location,
      zoom: 15,
      mapTypeId: 'roadmap',
    });
    const service = new google.maps.places.PlacesService(map);
    schoolSelect = optionInputEl.value;
    if (schoolSelect === "Primary School") {
      schoolType = "primary_school";
    }
    else if (schoolSelect === "Secondary School") {
      schoolType = "secondary_school";
    }
    searchParams = {
      location: currentSearchLocation,
      radius: 5000,
      type: schoolType
    }
    service.nearbySearch(searchParams, (results, status, pagination) => {
      if(status !== "OK" || !results) return;
       populateData(results, map);
    });
  }
}


