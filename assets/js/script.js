var submitBtnEl = document.getElementById("submitBtn");
var locationInputEl = document.getElementById("exampleDataList");
var searchHistoryEl = document.getElementById("searchHistory");
var forcastEl = document.getElementById("forcast");
var todayWeather= document.getElementById("today");
var fiveDay = document.getElementById("fiveDay");
var token = "c3979bfefcae56036aad13e3b005f5d5";

// sets up search history and calls api function
function getLocation(){
    // console.log("Button clicked")
    var locationID = locationInputEl.value;
    var newLocation = document.createElement("button");
    var attributes = {
        class: "btn btn-primary col-12 activeBtn",
         type: "button",
          id: locationID
    }
    // console.log(locationID);
    if(locationID){
        getLocationApi(`http://api.openweathermap.org/geo/1.0/direct?q=${locationID}&limit=1&appid=c3979bfefcae56036aad13e3b005f5d5`, locationID);
    
    }else{
        alert("please enter a location")
        return
    }

        // sets search to active display while other existing buttons to inactive
    if(document.getElementById(locationID) == null){
         var allActBtn = document.querySelectorAll(".activeBtn")
        for (let i = 0; i < allActBtn.length; i++) {
            allActBtn[i].setAttribute("class", "btn btn-secondary col-12 inactiveBtn");  
        }
        setAttributes(newLocation, attributes);
        newLocation.textContent += locationID;
        newLocation.style.marginTop = ".5em";
        searchHistoryEl.append(newLocation);
        searchHistoryEl.style.borderTop = "solid";
        locationInputEl.value = "";

         // listenr event for clicked previous search
        // swaps color and class to active w/ others to inactive
        // calls api functions for specifid button
        newLocation.addEventListener("click", function(){
            var allActBtn = document.querySelectorAll(".activeBtn")
            for (let i = 0; i < allActBtn.length; i++) {
                allActBtn[i].setAttribute("class", "btn btn-secondary col-12 inactiveBtn");  
            }
            
            this.setAttribute("class", "btn btn-primary col-12 activeBtn")
            getLocationApi(`https://api.openweathermap.org/geo/1.0/direct?q=${locationID}&limit=1&appid=c3979bfefcae56036aad13e3b005f5d5`, locationID);
        })
    }else{
        document.getElementById(locationID).setAttribute("class", "btn btn-primary col-12 activeBtn")
    }
};
// gets input longitude and latatude
function getLocationApi(requestUrl, location){
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                 response.json().then(function(data){
                console.log(data);
                var lon = data[0].lon;
                console.log(lon);
                var lat = data[0].lat;
                console.log(lat);
                getWetherApi(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3979bfefcae56036aad13e3b005f5d5`, location);
                });
            }else{
                alert("Error: " + response.statusText);
            }
            
        })
       
        .catch(function(error){
            alert("unable to connect to OpenWeather geocoding");
        });            
};
// gets weather for city name
function getWetherApi(requestUrl, location){
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                 response.json().then(function(data){
                console.log(data);
                setUpDisplay(data, location);
                });
            }else{
                alert("Error: " + response.statusText);
            }
            
        })
        .catch(function(error){
            alert("unable to connect to OpenWeather 5 day weather");
        });            
}
// function for setting multiple attributes
function setAttributes(element, attributes){
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr]);
        });
};
// sets today and 5day weather cards for location
function setUpDisplay(weatherData, location){
    // console.log(weatherData.list[0]);
    // 
    var weatherWeek = [
        weatherData.list[0], weatherData.list[8], weatherData.list[16], weatherData.list[24], weatherData.list[32], weatherData.list[39]
    ]
    // loop to populate cards
    for (let i = 0; i < weatherWeek.length; i++) {//each index is 3 hours adjust for 24 hours
        
        var todaysDate = weatherWeek[i].dt_txt.slice(0, 10);
        // console.log(todaysDate);
        var todaysTemp = weatherWeek[i].main.temp;
        var todaysWind = weatherWeek[i].wind.speed;
        var todaysHumidity = weatherWeek[i].main.humidity;
        var icon = weatherData.list[i].weather[0].icon; 
        var tt = document.getElementById(i+"Temp");
        var tW = document.getElementById(i+"Wind");
        var th = document.getElementById(i+"Humidity");
        var img = document.getElementById(i+"img");
        var temp = "https://openweathermap.org/img/wn/"+icon + "@2x.png"
       
        if (i==0) {
            var todayEl = document.getElementById("location");
            todayEl.textContent = location + " " + todaysDate;
        }else if(i>0){
            var dayEl = document.getElementById("day"+i);
            dayEl.textContent = todaysDate;
        }

        tt.textContent = "Weather: " + Math.trunc(tempConvert(todaysTemp)); //add trim
        tW.textContent = "Wind: " + todaysWind + "mph";
        th.textContent = "Humidity: " + todaysHumidity + "%";
        img.src = temp;
        img.style.height = "80px";
        img.style.width = "80px";
    }
};
// converts kelvin to farenhit
function tempConvert(temp){
    var tempF = (1.8 * (temp-273)+32);
    return tempF
}
// listener event for submit button, calls inital function based on txt input
submitBtnEl.addEventListener("click", getLocation);
