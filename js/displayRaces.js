//import data
import { displayDriverPopUp, displayConstructorPopUp, displayCircuitPopUp, displayFavorites } from './popups.js';
import { sortByPositionQualifying, sortByNameQualifying, sortByConstructorQualifying, sortByPositionResults, sortByNameResults, sortByConstructorResults } from './sort.js';


// Takes the race data for a season and displays it as a table.
function displayRaces(data, resultsData, qualifyingData){
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
        raceRow.addEventListener("click", () => displayRaceData(r, resultsData, qualifyingData));
        raceTable.appendChild(raceRow);
    })
    racesSection.appendChild(raceTable);
};

//Populate the orher side of browse to display the selected race information. Further call for 
//displayResults and displayQualifying functions.
function displayRaceData(race, resultsData, qualifyingData){
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
    raceCircuit.textContent = "Circuit: " + displayFavorites(`${race.circuit.name}`);

    raceCircuit.addEventListener("click", () => displayCircuitPopUp(race));

    let raceDate = document.createElement("h3");
    raceDate.textContent = `Date: ${race.date}`;
    let raceLink = document.createElement("a");
    raceLink.href = race.url;
    raceLink.textContent = "View Race Information";
    raceLink.className = "decoratedlink";

    fieldset.append(raceName, raceRound, raceYear, raceCircuit, raceDate, raceLink);
    raceInformation.appendChild(fieldset);
    displayQualifyingData(race, qualifyingData, resultsData);
    displayResultsData(race, resultsData);

};

// Display the result section for the selected race.
//This function displays the top three drivers as well as the results table.
function displayResultsData(race, resultsData){
    
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
        let rankDiv = document.createElement("div");
        rankDiv.className = "rank";
        let rankHeading = document.createElement("h2");
        const rankLabels = ["I", "II", "III"];
        let rankLabel = rankLabels[p.position - 1];
        rankHeading.innerHTML = `<b><i>${rankLabel}</i><br>${p.driver.forename} ${p.driver.surname}</b>`;
        rankDiv.appendChild(rankHeading);
        rankDiv.addEventListener("click", () => displayDriverPopUp(p, resultsData));
        topThreeDiv.appendChild(rankDiv);
    });
    fieldset.appendChild(topThreeDiv);

    //Now we display all the results ins a table below the top 3.
    let resultTable = document.createElement("table");
    resultTable.className = "interactiveTable";
    let headingRow = document.createElement("tr");
    let thPosition = document.createElement("th");
    thPosition.textContent = filteredResults[0].position < filteredResults[1].position ? "Pos ▽" : "Pos △"; //ADD: Event Listner to sort table below upon click**************************************************************************************************
    thPosition.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionResults(race, filteredResults, resultsData)}});
    let thName = document.createElement("th");
    thName.textContent = (filteredResults[0].driver.forename)<(filteredResults[1].driver.forename) ? "Name A-Z" : "Name Z-A";  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    thName.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByNameResults(race, filteredResults ,resultsData)}});
    let thConst = document.createElement("th");
    thConst.textContent = (filteredResults[0].constructor.name)<(filteredResults[15].constructor.name) ? "Constructor A-Z" : "Constructor Z-A";;  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    thConst.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByConstructorResults(race, filteredResults ,resultsData)}});
    let thLaps = document.createElement("th");
    thLaps.textContent = "Laps";  //ADD: Event Listner to sort table below upon click**************************************************************************************************
    let thPts = document.createElement("th");
    thPts.textContent = "Pts";  //ADD: Event Listner to sort table below upon click**************************************************************************************************

    headingRow.append(thPosition, thName, thConst, thLaps, thPts);
    resultTable.appendChild(headingRow);

    filteredResults.forEach((r) => {
        // console.log(r);
        let resultRow = document.createElement("tr");
        let resultPos = document.createElement("td");
        resultPos.textContent = r.position;
        let resultName = document.createElement("td");
        resultName.textContent = displayFavorites(`${r.driver.forename} ${r.driver.surname}`); //ADD: Event Listner to driver pop-up***********************************************************************
        let resultCons = document.createElement('td');
        resultCons.textContent = displayFavorites(`${r.constructor.name}`); //ADD: Event Listner to constructor pop-up******************************************************************************************
        let resultLaps = document.createElement("td");
        resultLaps.textContent = r.laps;
        let resultPts = document.createElement("td");
        resultPts.textContent = r.points;

        resultRow.append(resultPos, resultName, resultCons, resultLaps, resultPts);
        resultTable.appendChild(resultRow);

        resultName.addEventListener("click", () => displayDriverPopUp(r, resultsData));
        resultCons.addEventListener("click", () => displayConstructorPopUp(r, resultsData));
    });

    fieldset.appendChild(resultTable);
    resultDiv.appendChild(fieldset);

};

//This function displays the qualifying table in a similar fashion as the results table.
function displayQualifyingData(race, qualifyingData, resultsData){
    let selectedRace = race.id;
    let filteredQualifying = qualifyingData.filter((q) => {
        return q.race.id == selectedRace;
    });

    // console.log(filteredQualifying);
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
    thPosition.textContent =  filteredQualifying[0].position < filteredQualifying[1].position ? "Pos ▽" : "Pos △"; //ADD: Event Listner to sort table below upon click********************************************************************************
    thPosition.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionQualifying(race, filteredQualifying, resultsData)}});
    let thName = document.createElement("th");
    thName.textContent =  (filteredQualifying[0].driver.forename)<(filteredQualifying[1].driver.forename) ? "Name A-Z" : "Name Z-A"; //ADD: Event Listner to sort table below upon click********************************************************************************
    thName.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByNameQualifying(race, filteredQualifying ,resultsData)}});
    let thConst = document.createElement("th");
    thConst.textContent =  (filteredQualifying[0].constructor.name)<(filteredQualifying[15].constructor.name) ? "Constructor A-Z" : "Constructor Z-A"; //ADD: Event Listner to sort table below upon click********************************************************************************
    thConst.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByConstructorQualifying(race, filteredQualifying ,resultsData)}});
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
        qualifyName.textContent = displayFavorites(`${q.driver.forename} ${q.driver.surname}`);
        qualifyName.addEventListener("click", () => displayDriverPopUp(q, resultsData));
        let qualifyConst = document.createElement("td");
        qualifyConst.textContent = displayFavorites(`${q.constructor.name}`);
        qualifyConst.addEventListener("click", () => displayConstructorPopUp(q, resultsData));
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

export {displayRaces, displayQualifyingData, displayResultsData};