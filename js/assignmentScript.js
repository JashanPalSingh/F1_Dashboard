// JavaScript file or the Assignment 2
// Authors: Jashan Pal Singh, Ishan Ishan.

// Wait for the DOM content to load.
addEventListener( "DOMContentLoaded", function(){

    raceURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=';
    resultURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=';
    qualifyURL = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=';

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
    let data = localStorage.getItem("races");

    if (! data){
        getSeasonData(season).then(data => {
            displayRaces(data[0]);
            resultsData = data[1];
            qualifyingData = data[2];
            //save in local storage
            localStorage.setItem("races", JSON.stringify(data[0]));
            localStorage.setItem("results", JSON.stringify(data[1]));
            localStorage.setItem("qualifying", JSON.stringify(data[2]));
        });
    } else {
        resultsData = JSON.parse(localStorage.getItem("results"));
        qualifyingData = JSON.parse(localStorage.getItem("qualifying"));
        displayRaces(JSON.parse(data));
    }
    //display browse pane
    browse.classList.toggle("hidden");
}

// Fetches all season data at once unsing Promise.all
function getSeasonData(season){
    let racesList = fetch(raceURL + season).then(resp => resp.json());
    let resultsList = fetch(resultURL + season).then(resp => resp.json());
    let qualifyingList = fetch(qualifyURL + season).then(resp => resp.json());
    return Promise.all([racesList, resultsList, qualifyingList]);
}


// Takes the race data for a season and displays it as a table.
function displayRaces(data){
    // console.log(data);
    let racesSection = document.querySelector("#races");
    let heading = document.createElement("h2");
    heading.textContent = "Races";
    racesSection.appendChild(heading);
    let raceTable = document.createElement("table");
    let headingRow = document.createElement("tr");
    let thRnd = document.createElement("th");
    thRnd.textContent = "Rnd";
    headingRow.appendChild(thRnd);

    let thName = document.createElement("th");
    thName.textContent = "Name";
    headingRow.appendChild(thName);

    raceTable.appendChild(headingRow);

    data.forEach(r => {
        let raceRow = document.createElement("tr");
        let raceRnd = document.createElement("td");
        let raceName = document.createElement("td");
        raceRnd.textContent = r.round;
        raceName.textContent = r.name;
        raceRow.appendChild(raceRnd);
        raceRow.appendChild(raceName);
        raceRow.addEventListener("click", () => displayRaceData(r));
        raceTable.appendChild(raceRow);
    })
    racesSection.appendChild(raceTable);
};

//Populate the orher side of browse to display the selected race information. Further call for 
//displayResults and displayQualifying functions.
function displayRaceData(race){
    let raceInformation = document.querySelector("#raceInformation");
    raceInformation.textContent =''; //Empty the raceInformation div everytime a race is selected and replace it with content below.
    // console.log(race);
    let raceName = document.createElement("h1");
    raceName.textContent = race.name;
    let raceRound = document.createElement("h3");
    raceRound.textContent = `Round: ${race.round}`;
    let raceYear = document.createElement("h3");
    raceYear.textContent = `Year: ${race.year}`;
    let raceCircuit = document.createElement("h3");
    raceCircuit.textContent = `Circuit: ${race.circuit.name}` //ADD Event Listner for circuit pop-up**********************************************
    let raceDate = document.createElement("h3");
    raceDate.textContent = `Date: ${race.date}`;
    let raceLink = document.createElement("a");
    raceLink.href = race.url;
    raceLink.textContent = "View Race Information";

    raceInformation.appendChild(raceName);
    raceInformation.appendChild(raceRound);
    raceInformation.appendChild(raceYear);
    raceInformation.appendChild(raceCircuit);
    raceInformation.appendChild(raceDate);
    raceInformation.appendChild(raceLink);

    displayResultsData(race);
    displayQualifyingData(race);

}

function displayResultsData(race){
    console.log(resultsData);
}

function displayQualifyingData(race){

}

function displayDriverPopUp(){

}

function displayConstructorPopUop(){

}

function displayCircuitPopUp(){
    
}


});
