// JavaScript file or the Assignment 2
// Authors: Jashan Pal Singh, Ishan Ishan.

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
            displayRaces(data[0]);
            resultsData = data[1];
            qualifyingData = data[2];
            //save in local storage
            localStorage.setItem(`races${season}`, JSON.stringify(data[0]));
            localStorage.setItem(`results${season}`, JSON.stringify(data[1]));
            localStorage.setItem(`qualifying${season}`, JSON.stringify(data[2]));
        });
    } else {
        resultsData = JSON.parse(localStorage.getItem(`results${season}`));
        qualifyingData = JSON.parse(localStorage.getItem(`qualifying${season}`));
        displayRaces(JSON.parse(data));
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


// Takes the race data for a season and displays it as a table.
function displayRaces(data){
    // console.log(data);
    let racesSection = document.querySelector("#races");
    let heading = document.createElement("h2");
    heading.textContent = "Races";
    racesSection.appendChild(heading);
    let raceTable = document.createElement("table");
    raceTable.className = "interactiveTable";
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
        raceRow.append(raceRnd, raceName);
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
    let fieldset = document.createElement("fieldset");

    let raceName = document.createElement("legend");
    raceName.textContent = race.name;
    raceName.className = "constructorbig";
    let raceRound = document.createElement("h3");
    raceRound.textContent = `Round: ${race.round}`;
    let raceYear = document.createElement("h3");
    raceYear.textContent = `Year: ${race.year}`;
    let raceCircuit = document.createElement("h3");
    raceCircuit.textContent = `Circuit: ${race.circuit.name}`; //ADD Event Listner for circuit pop-up**********************************************

    raceCircuit.addEventListener("click", () => displayCircuitPopUp(race));

    let raceDate = document.createElement("h3");
    raceDate.textContent = `Date: ${race.date}`;
    let raceLink = document.createElement("a");
    raceLink.href = race.url;
    raceLink.textContent = "View Race Information";
    raceLink.className = "decoratedlink";

    fieldset.append(raceName, raceRound, raceYear, raceCircuit, raceDate, raceLink);
    raceInformation.appendChild(fieldset);
    displayQualifyingData(race);
    displayResultsData(race);

};

// Display the result section for the selected race.
//This function displays the top three drivers as well as the results table.
function displayResultsData(race){
    
    let selectedRace = race.id;
    let filteredResults = resultsData.filter( (r) => {
        return r.race.id == selectedRace;
    });
    // console.log(filteredResults);

    let resultDiv = document.querySelector("#result");
    resultDiv.textContent = "";
    let fieldset = document.createElement("fieldset");

    let heading = document.createElement("legend");
    heading.textContent = "Results";
    heading.className = "constructorbig";
    fieldset.appendChild(heading);
    // Take top three drivers, sort them into order. This should work despite adding filters on the table below.
    let topThreePositions = filteredResults.filter((fr) => {return fr.position == 1 || fr.position == 2 || fr.position == 3});
    topThreePositions.sort( function (a,b){return a.position - b.position} );  //REFERENCE: https://www.w3schools.com/js/js_array_sort.asp
    //Test: using console.log: WORKS
    // console.log(`First: ${topThreePositions[0].driver.surname}, second: ${topThreePositions[1].driver.surname}, third: ${topThreePositions[2].driver.surname}`);
    
    let topThreeDiv = document.createElement("div");
    topThreeDiv.id = 'top3';

    topThreePositions.forEach(p => {
        let rankDiv = document.createElement("div");  //ADD: Event Handler to display the driver pop-up************************************************************************************8
        rankDiv.className = "rank";
        let rankHeading = document.createElement("h2");
        const rankLabels = ["I", "II", "III"];
        let rankLabel = rankLabels[p.position - 1];
        rankHeading.innerHTML = `<b><i>${rankLabel}</i><br>${p.driver.forename} ${p.driver.surname}</b>`;
        rankDiv.appendChild(rankHeading);
        topThreeDiv.appendChild(rankDiv);
    });
    fieldset.appendChild(topThreeDiv);

    //Now we display all the results ins a table below the top 3.
    let resultTable = document.createElement("table");
    resultTable.className = "interactiveTable";
    let headingRow = document.createElement("tr");
    let thPosition = document.createElement("th");
    thPosition.textContent = "Pos"; //ADD: Event Listner to sort table below upon click**************************************************************************************************
    let thName = document.createElement("th");
    thName.textContent = "Name";  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    let thConst = document.createElement("th");
    thConst.textContent = "Constructor";  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    let thLaps = document.createElement("th");
    thLaps.textContent = "Laps";  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    let thPts = document.createElement("th");
    thPts.textContent = "Pts";  //ADD: Event Listner to sort table below upon click**************************************************************************************************

    headingRow.append(thPosition, thName, thConst, thLaps, thPts);
    resultTable.appendChild(headingRow);

    filteredResults.forEach((r) => {
        let resultRow = document.createElement("tr");
        let resultPos = document.createElement("td");
        resultPos.textContent = r.position;
        let resultName = document.createElement("td");
        resultName.textContent = `${r.driver.forename} ${r.driver.surname}`; //ADD: Event Listner to driver pop-up***********************************************************************
        let resultCons = document.createElement('td');
        resultCons.textContent = r.constructor.name; //ADD: Event Listner to constructor pop-up******************************************************************************************
        let resultLaps = document.createElement("td");
        resultLaps.textContent = r.laps;
        let resultPts = document.createElement("td");
        resultPts.textContent = r.points;

        resultRow.append(resultPos, resultName, resultCons, resultLaps, resultPts);
        resultTable.appendChild(resultRow);
    });

    fieldset.appendChild(resultTable);
    resultDiv.appendChild(fieldset);

};

//This function displays the qualifying table in a similar fashion as the results table.
function displayQualifyingData(race){
    let selectedRace = race.id;
    let filteredQualifying = qualifyingData.filter((q) => {
        return q.race.id == selectedRace;
    });

    console.log(filteredQualifying);
    let qualifyDiv = document.querySelector("#qualify");
    qualifyDiv.textContent = "";
    let fieldset = document.createElement("fieldset");
    let heading = document.createElement("legend");
    heading.textContent = "Qualifying";
    heading.className = "constructorbig";
    fieldset.appendChild(heading);

    // Now we create the table
    let qualifyTable = document.createElement("table");
    qualifyTable.className = "interactiveTable";
    let headingRow = document.createElement("tr");
    let thPosition = document.createElement("th");
    thPosition.textContent = "Pos"; //ADD: Event Listner to sort table below upon click********************************************************************************
    let thName = document.createElement("th");
    thName.textContent = "Name"; //ADD: Event Listner to sort table below upon click********************************************************************************
    let thConst = document.createElement("th");
    thConst.textContent = "Constructor"; //ADD: Event Listner to sort table below upon click********************************************************************************
    let thQ1 = document.createElement("th");
    thQ1.textContent = "Q1"; //ADD: Event Listner to sort table below upon click********************************************************************************
    let thQ2 = document.createElement("th");
    thQ2.textContent = "Q2"; //ADD: Event Listner to sort table below upon click********************************************************************************
    let thQ3 = document.createElement("th");
    thQ3.textContent = "Q3"; //ADD: Event Listner to sort table below upon click********************************************************************************
    
    headingRow.append(thPosition, thName, thConst, thQ1, thQ2, thQ3);
    qualifyTable.appendChild(headingRow);

    filteredQualifying.forEach((q) =>{
        let qualifyRow = document.createElement("tr");
        let qualifyPos = document.createElement("td");
        qualifyPos.textContent = q.position;
        let qualifyName = document.createElement("td");
        qualifyName.textContent = `${q.driver.forename} ${q.driver.surname}`;
        let qualifyConst = document.createElement("td");
        qualifyConst.textContent = q.constructor.name;
        let qualifyQ1 = document.createElement("td");
        qualifyQ1.textContent = q.q1;
        let qualifyQ2 = document.createElement("td");
        qualifyQ2.textContent = q.q2;
        let qualifyQ3 = document.createElement("td");
        qualifyQ3.textContent = q.q3;

        qualifyRow.append(qualifyPos, qualifyName, qualifyConst, qualifyQ1, qualifyQ2, qualifyQ3);
        qualifyTable.appendChild(qualifyRow);
    })

    fieldset.appendChild(qualifyTable);
    qualifyDiv.appendChild(fieldset);

};

function displayDriverPopUp(){

}

function displayConstructorPopUop(){

}

function displayCircuitPopUp(race){
    let circuitPopUp = document.querySelector("#circuitPopUp");
    circuitPopUp.textContent = "";
    circuitPopUp.style.display= "block";
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.className = "constructorbig";
    legend.textContent = "Circuit Details";
    fieldset.appendChild(legend);
    console.log(race);

    let circuitName = document.createElement("h2");
    circuitName.textContent = `Name: ${race.circuit.name}`;
    let circuitLocation = document.createElement("h2");
    circuitLocation.textContent = `Location: ${race.circuit.location}`;
    let circuitCountry = document.createElement("h2");
    circuitCountry.textContent = `Country: ${race.circuit.country}`;
    let circuitURL = document.createElement("a");
    circuitURL.href = race.circuit.url;
    circuitURL.className = "decoratedLink";
    circuitURL.textContent = "View Circuit";
    const br = document.createElement("br");

    let closePopUp = document.createElement("a");
    closePopUp.textContent = "Close";
    closePopUp.className = "decoratedLink";
    closePopUp.addEventListener("click", () => {circuitPopUp.style.display = "none"});

    fieldset.append(circuitName, circuitLocation, circuitCountry, circuitURL, closePopUp);
    circuitPopUp.appendChild(fieldset);

}


});
