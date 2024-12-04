// JavaScript file or the Assignment 2
// Authors: Jashan Pal Singh, Ishan Ishan.

//import data
import {displayRaces} from "./displayRaces.js";

// Wait for the DOM content to load.
addEventListener( "DOMContentLoaded", function(){

    let raceURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=';
    let resultURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=';
    let qualifyURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=';

    let resultsData;
    let qualifyingData;
    let selectedSeason;


    // Creates the season dropdown and the submit button within the home article.
    //When user presses the button, it executes another function via event handler. 
    function createSeasonList() {
    let list = document.createElement("select");
    list.className = 'seasonSelect';
    let article = document.querySelector("#description");
    for (let i= 2023; i>2019; i--){
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        list.appendChild(option);
    }
    article.appendChild(list);
    let button = document.createElement("button");
    button.textContent = "SELECT SEASON";
    button.className = "homeSelect";
    button.type = "button";
    button.addEventListener("click", () => {
        let selectedValue = list.value;
        loadBrowse(selectedValue);
    });
    article.appendChild(button);
};
//Call for the function to execute and display our select element and button within home. 
createSeasonList();

//Function that loads the browse article after user executes the elect season event handler in the 
//season list function.
function loadBrowse(season){
    //Set selected season (used further for results, qualifying, drivers and constructors).
    selectedSeason = season;
    //Hide home pane
    document.querySelector("#home").style.display = "none";
    let browse = document.querySelector("#browse");
    let data = localStorage.getItem(`races${season}`);

    if (! data){
        getSeasonData(season).then(data => {
            resultsData = data[1];
            qualifyingData = data[2];
            //save in local storage
            localStorage.setItem(`races${season}`, JSON.stringify(data[0]));
            localStorage.setItem(`results${season}`, JSON.stringify(data[1]));
            localStorage.setItem(`qualifying${season}`, JSON.stringify(data[2]));

            displayRaces(data[0], resultsData, qualifyingData);
        });
    } else {
        resultsData = JSON.parse(localStorage.getItem(`results${season}`));
        qualifyingData = JSON.parse(localStorage.getItem(`qualifying${season}`));
        displayRaces(JSON.parse(data), resultsData, qualifyingData);
    }
    //display browse pane
    browse.classList.toggle("hidden");
};

// Fetches all season data at once unsing Promise.all
function getSeasonData(season){
    let racesList = fetch(raceURL + season).then(resp => resp.json());
    let resultsList = fetch(resultURL + season).then(resp => resp.json());
    let qualifyingList = fetch(qualifyURL + season).then(resp => resp.json());
    return Promise.all([racesList, resultsList, qualifyingList]);
};

});
