var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("search-input");
const historySectionEl = document.getElementById("search-history-section");
const listSchoolsDivEl = document.getElementById("list-schools");


// Function to get weather data from Open Weather Map API
function getApi() {
    var suburbName = cityInputEl.value;
    var requestUrl = "https://maps.googleapis.com/maps/api/js?key=&libraries=places";
    fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => { populateData(data);});
}

// Event listener for the Search button
searchButton.addEventListener('click', getApi);

// Setting the values into HTML elements
// function setValueToElement(id, value) {
//     document.getElementById(id).textContent = value;
// }

// Extracting the required temperature, wind and humidity information from weather JSON
function populateData(data) {
    console.log(data);
    // listSchoolsDivEl.style.visibility = "visible";
    // var date = formatDate(String(data.list[0].dt_txt).substring(0,10));
    // var cityDate= data.city.name + "   (" + date + ")";
    // setValueToElement('city-name', cityDate);
    // document.getElementById('weather-icon').src="http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
    // setValueToElement('city-temp-1', "Temp:  " + data.list[0].main.temp + '  \u00B0' + "C");
    // setValueToElement('city-wind-1', "Wind:  " + data.list[0].wind.speed + " MPH");
    // setValueToElement('city-humidity-1', "Humidity:  " + data.list[0].main.humidity + " %");
    // showFiveDayWeather(data);
    
}


// Display weather for next five days
// function showFiveDayWeather(data) {
//     fiveDayDivEl.style.visibility = "visible";
//     for (var i=1; i<=5;i++) {
//         var cityDate= data.list[7*i+3].dt_txt;
//         setValueToElement('date'+i, formatDate(String(cityDate).substring(0,10)));
//         document.getElementById('weather-icon-day'+i).src="http://openweathermap.org/img/wn/" + data.list[7*i+3].weather[0].icon + ".png";
//         setValueToElement('temp-day'+i, "Temp:  " + data.list[7*i+3].main.temp + '  \u00B0' + "C");
//         setValueToElement('wind-day'+i, "Wind:  " + data.list[7*i+3].wind.speed + " MPH");
//         setValueToElement('humidity-day'+i, "Humidity:  " + data.list[7*i+3].main.humidity + " %");
//     }
// }
