
var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("search-input");
const listSchoolsDivEl = document.getElementById("list-schools");


// Function to get data from Google Maps API
function getApi() {
    initMap();
}

// Event listener for the Search button
searchButton.addEventListener('click', getApi);



// Extracting the required temperature, wind and humidity information from weather JSON
function populateData(data) {
    console.log(data);
    
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
      console.log(results);
    });
  }
}