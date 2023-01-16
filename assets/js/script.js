var submitBtnEl = document.getElementById("submitBtn");
var locationInputEl = document.getElementById("exampleDataList");
var searchHistoryEl = document.getElementById("searchHistory");
var forcastEl = document.getElementById("forcast");
var todayWeather= document.getElementById("today");
var fiveDay = document.getElementById("fiveDay");


function getLocation(){
    console.log("Button clicked")
    var locationID = locationInputEl.value;
    console.log(locationID);
    if(locationID){
        getLocationApi("http://api.openweathermap.org/geo/1.0/direct?q="+locationID+"&limit=1&appid=0cedfaa9454de2de2c5ab1e8aa2d105b", locationID);
    }
    var newLocation = document.createElement("button");
    var attributes = {
        class: "btn btn-primary col-12 activeBtn",
         type: "button",
          id: locationID
        }

    if(document.getElementById(locationID) == null){
         var allActBtn = document.querySelectorAll(".activeBtn")
        for (let i = 0; i < allActBtn.length; i++) {
            allActBtn[i].setAttribute("class", "btn btn-secondary col-12 unactiveBtn");  
        }
        setAttributes(newLocation, attributes);
        newLocation.textContent += locationID;
        newLocation.style.marginTop = ".5em";
        searchHistoryEl.append(newLocation);
        searchHistoryEl.style.borderTop = "solid";
        locationInputEl.value = "";

         // make listener event for search history
        // add color swap for active location display
        newLocation.addEventListener("click", function(){
            var allActBtn = document.querySelectorAll(".activeBtn")
            for (let i = 0; i < allActBtn.length; i++) {
                allActBtn[i].setAttribute("class", "btn btn-secondary col-12 unactiveBtn");  
            }
            
            this.setAttribute("class", "btn btn-primary col-12 activeBtn")
            getLocationApi("http://api.openweathermap.org/geo/1.0/direct?q="+locationID+"&limit=1&appid=0cedfaa9454de2de2c5ab1e8aa2d105b", locationID)
        })
    }else{
        document.getElementById(locationID).setAttribute("class", "btn btn-primary col-12 activeBtn")
    }
};

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
                getWetherApi("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=414bc693d7b3bc637f7a83bcddd54bcf", location);
                });
            }else{
                alert("Error: " + response.statusText);
            }
            
        })
       
        .catch(function(error){
            alert("unable to connect to OpenWeather geocoding");
        });            
};

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
function setAttributes(element, attributes){
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr]);
        });
    };
function setUpDisplay(weatherData, location){
    console.log(weatherData.list[0]);
    // Today
    var weatherWeek = [
        weatherData.list[0], weatherData.list[1], weatherData.list[2], weatherData.list[3], weatherData.list[4], weatherData.list[5]
    ]

    for (let i = 0; i < weatherWeek.length; i++) {//each index is 3 hours adjust for 24 hours
        
        var todaysDate = weatherWeek[i].dt_txt;
        // console.log(todaysDate);
        var todaysTemp = weatherWeek[i].main.temp;
        var todaysWind = weatherWeek[i].wind.speed;
        var todaysHumidity = weatherWeek[i].main.humidity;
        var tt = document.getElementById(i+"Temp");
        var tW = document.getElementById(i+"Wind");
        var th = document.getElementById(i+"Humidity");

        if (i==0) {
            var todayEl = document.getElementById("location");
            todayEl.textContent = location + " " + todaysDate;
        }else if(i>0){
            var dayEl = document.getElementById("day"+i);
            dayEl.textContent = todaysDate;
        }
        // var icon = weatherData.list[i].weather[0].icon; 
        tt.textContent = "Weather: " + tempConvert(todaysTemp); //add trim
        tW.textContent = "Wind: " + todaysWind + "mph";
        th.textContent = "Humidity: " + todaysHumidity + "%";
      
    }
};

function tempConvert(temp){
    var tempF = (1.8 * (temp-273)+32);
    return tempF
}

submitBtnEl.addEventListener("click", getLocation);
