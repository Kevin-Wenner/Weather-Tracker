var submitBtnEl = document.getElementById("submitBtn");
var locationInputEl = document.getElementById("exampleDataList");
var searchHistoryEl = document.getElementById("searchHistory");


function getLocation(){
    console.log("Button clicked")
    var locationID = locationInputEl.value;
    console.log(locationID);
    if(locationID){
        getLocationApi("http://api.openweathermap.org/geo/1.0/direct?q="+locationID+"&limit=1&appid=0cedfaa9454de2de2c5ab1e8aa2d105b");
    }
    var newLocation = document.createElement("button");
    var attributes = {class: "btn btn-primary col-12", type: "button", id: locationID}

    function setAttributes(element, attributes){
        Object.keys(attributes).forEach(attr => {element.setAttribute(attr, attributes[attr]);
        });
    };
    
        setAttributes(newLocation, attributes);
        newLocation.textContent += locationID;
        newLocation.style.marginTop = ".5em";
        searchHistoryEl.append(newLocation);
        searchHistoryEl.style.borderTop = "solid";
        locationInputEl.value = "";

};

function getLocationApi(requestUrl){
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                 response.json().then(function(data){
                console.log(data);
                var lon = data[0].lon;
                console.log(lon);
                var lat = data[0].lat;
                console.log(lat);
                getWetherApi("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=414bc693d7b3bc637f7a83bcddd54bcf");
                });
            }else{
                alert("Error: " + response.statusText);
            }
            
        })
        .catch(function(error){
            alert("unable to connect to OpenWeather geocoding");
        });            
};

function getWetherApi(requestUrl){
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                 response.json().then(function(data){
                console.log(data);
                setUpDisplay(data);
                });
            }else{
                alert("Error: " + response.statusText);
            }
            
        })
        .catch(function(error){
            alert("unable to connect to OpenWeather 5 day weather");
        });            
}

function setUpDisplay(weatherData){
    console.log(weatherData.list[0]);
    // creat cards
    
}

submitBtnEl.addEventListener("click", getLocation);