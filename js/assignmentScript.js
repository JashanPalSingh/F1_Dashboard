// Main javaScript file for the dashboard, this file retrieves data from an external API 
// and stores it locally on the browser. The data is then passed on to functions present in
// other JavaScript files through modules.
// Authors: Jashan Pal Singh, Ishan Ishan.

//import the main display function from a sister js file.
import {displayRaces} from "./displayRaces.js";

// Wait for the DOM content to load before initiating any javaScript.

addEventListener( "DOMContentLoaded", function(){

    let raceURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=';  // External API to fetch all races pertaining to a specific season.
    let resultURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season='; // External API to fetch all the race results of a specific season.
    let qualifyURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season='; // External API to fetch all the qualifying data for a specific season.

    let resultsData; // Empty array that will store rasults data.
    let qualifyingData; // Empty array that will store qualifying data.
    let selectedSeason; // The selected season by a user (number).


     
    /**
     * Creates the season dropdown and the submit button within the home article.
     * When user presses the button, it executes another function to load browse pane via an event handler.
     */
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


/**
 * Function that loads the browse article after user executes the elect season event handler in the 
 * season list function.
 * @param {number} season 
 */
function loadBrowse(season){
    //Set selected season ( can be used further for results, qualifying, drivers and constructors. No harm to keep it in a variable).
    selectedSeason = season;
    //Hide home pane
    document.querySelector("#home").style.display = "none";
    let browse = document.querySelector("#browse");
    let data = localStorage.getItem(`races${season}`); // try to fetch data from localStorage.

    // if data doesn's exist in local storage, call for a function to fetch it from the APIs mentioned above
    // and store it to localStorage.
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
    
    // Otherwise, just grab the data from localStorage and use it.
    } else {
        resultsData = JSON.parse(localStorage.getItem(`results${season}`));
        qualifyingData = JSON.parse(localStorage.getItem(`qualifying${season}`));
        displayRaces(JSON.parse(data), resultsData, qualifyingData);
    }
    //display browse pane
    browse.style.display = "grid";
};

/**
 * Fetches all season data at once unsing Promise.all
 * @param {number} season 
 * @returns {Promise}
 */
function getSeasonData(season){
    let racesList = fetch(raceURL + season).then(resp => resp.json());
    let resultsList = fetch(resultURL + season).then(resp => resp.json());
    let qualifyingList = fetch(qualifyURL + season).then(resp => resp.json());
    return Promise.all([racesList, resultsList, qualifyingList]);
};

});
