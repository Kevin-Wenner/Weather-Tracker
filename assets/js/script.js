var submitBtnEl = document.getElementById("submitBtn");
var locationInputEl = document.getElementById("exampleDataList");
var searchHistoryEl = document.getElementById("searchHistory");

function getLocation(){
    console.log("Button clicked")
    var locationID = locationInputEl.value;
    console.log(locationID);
    if (locationID) {
        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + locationID + "&limit=1&appid=").then((response) => response.json()).then((data) => console.log(data))
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
    }

};


submitBtnEl.addEventListener("click", getLocation);