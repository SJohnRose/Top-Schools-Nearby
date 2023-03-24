
var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("search-input");
var distCardsDivEl = document.getElementById("dist-cards");
var cardTemplateDivEl = document.getElementById("card-template");
var schoolCount = 0;


// Function to get data from Google Maps API
function getApi() {
    initMap();
}

// Event listener for the Search button
searchButton.addEventListener('click', getApi);



// Extracting the required temperature, wind and humidity information from weather JSON
function populateData(places, map) {
  while(distCardsDivEl.hasChildNodes()) {
    distCardsDivEl.removeChild(distCardsDivEl.firstChild);
  }
  schoolCount = 0;
  for(var place of places) {
    if (place.geometry && place.geometry.location) {
      addSchool(place);
    }
  }
}

// Function to get the school name from results
function addSchool(school) {
  var schoolName = school.name;
  service = new google.maps.places.PlacesService(map);
  request = {
    placeId: school.place_id,
    fields: ['name', 'formatted_address', 'icon']
  }
  service.getDetails(request, addSchoolDetails);
}

// Send school details to HTML div cards
function addSchoolDetails(school, status) {
  if(status === google.maps.places.PlacesServiceStatus.OK) {
    
    console.log(school);
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
  p1 = document.createElement("p");
  p1.setAttribute("class", "card-header-title");
  p1.textContent = school.name;
  header = document.createElement("header");
  header.setAttribute("class", "card-header");
  header.appendChild(p1);
  return header;
}


function createCardImage(school) {
  figure=document.createElement("figure");
  figure.setAttribute("class", "image is-16x16 is-3by2");
  figure.setAttribute("style", "height: 16px;padding-top: 0;");
  img = document.createElement("img");
  img.setAttribute("src", school.icon);
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
  //console.log("called");
  var currentLocation = new google.maps.LatLng(0,0);
  mapElement = document.getElementById('map');
  map = new google.maps.Map(mapElement, {center: currentLocation, zoom: 10});
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: locationName,
    fields: ['name', 'geometry']

  };
  service.findPlaceFromQuery(request, getSchoolsNearby);
}

// Get schools information from Google maps 
function getSchoolsNearby(results, status) {
  console.log("getSchools called");
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    locationResult = results[0];
    const currentSearchLocation = {lat: locationResult.geometry.location.lat(), lng: locationResult.geometry.location.lng()};
    const map = new google.maps.Map(document.getElementById("map"), {
      center: locationResult.name,
      zoom: 17,
      mapID: "8d193001f940fde3",
    });
    const service = new google.maps.places.PlacesService(map);
    searchParams = {
      location: currentSearchLocation,
      radius: 5000,
      type: "school"
    }
    service.nearbySearch(searchParams, (results, status, pagination) => {
      //console.log(results);
      if(status !== "OK" || !results) return;
      populateData(results, map);
    });
  }
}