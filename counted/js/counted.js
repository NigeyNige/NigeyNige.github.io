
//Grab the existing elements
var elements = [];
var victimName = document.getElementById("victimName");
var victimAge = document.getElementById("victimAge");
var victimCause = document.getElementById("victimCause");
var victimDate = document.getElementById("victimDate");

elements.push(victimName);
elements.push(victimAge);
elements.push(victimCause);
elements.push(victimDate);
var JSONURL = "https://thecountedapi.com/api/counted";

var selector = 0;
var interval = 1500;
var minimumInterval = 100;
var timer = 0;
var rawData;

getData();

function getData() {
    
    $.getJSON(JSONURL, function (data) {
        rawData = data;
        console.log(rawData);
        displayVictim();

        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }

    });
    
}

function displayVictim() {
    victimName.innerHTML = rawData[selector].name;
    victimAge.innerHTML = rawData[selector].age;
    victimCause.innerHTML = rawData[selector].cause;
    victimDate.innerHTML = rawData[selector].day + " " + rawData[selector].month + " " + rawData[selector].year;
    
    tickDisplay();
}

function tickDisplay() {
    selector = Math.floor(Math.random() * rawData.length);
    setTimeout(displayVictim, interval);
    
    if (interval > minimumInterval) {
        interval -= 25;
    }
}