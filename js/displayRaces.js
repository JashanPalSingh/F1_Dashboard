//This JavaScript file is responsible for displaying most of the browse data.
// @authors: jashan Pal Singh, Ishan Ishan.

//import data from other modules
import { displayDriverPopUp, displayConstructorPopUp, displayCircuitPopUp, displayFavorites } from './popups.js';
import { sortByQQualifying, sortByPositionQualifying, sortByNameQualifying, sortByConstructorQualifying, sortByPositionResults, sortByNameResults, sortByConstructorResults } from './sort.js';



/**
 * Takes the race data, qualifying data and results data for a season and displays it as a table on the side.
 * @param {Array} data 
 * @param {Array} resultsData 
 * @param {Array} qualifyingData 
 */
function displayRaces(data, resultsData, qualifyingData){

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


/**
 * Populate the other side of browse to display the selected race information. Further call for 
 * displayResults and displayQualifying functions.
 * @param {Race object} race 
 * @param {Array} resultsData 
 * @param {Array} qualifyingData 
 */
function displayRaceData(race, resultsData, qualifyingData){
    let raceInformation = document.querySelector("#raceInformation");
    raceInformation.textContent =''; //Empty the raceInformation div everytime a race is selected and replace it with content below.

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

    raceCircuit.addEventListener("click", () => displayCircuitPopUp(race, qualifyingData, resultsData));

    let raceDate = document.createElement("h3");
    raceDate.textContent = `Date: ${race.date}`;
    let raceLink = document.createElement("a");
    raceLink.href = race.url;
    raceLink.textContent = "View Race Information";
    raceLink.className = "decoratedlink";

    fieldset.append(raceName, raceRound, raceYear, raceCircuit, raceDate, raceLink);
    raceInformation.appendChild(fieldset);
    displayQualifyingData(race, qualifyingData, resultsData);
    displayResultsData(race, resultsData, qualifyingData);

};

// Display the result section for the selected race.
//This function displays the top three drivers as well as the results table.
function displayResultsData(race, resultsData, qualifyingData){
    
    let selectedRace = race.id;

    // filter our results data based on the selected race.
    let filteredResults = resultsData.filter( (r) => {
        return r.race.id == selectedRace;
    });


    let resultDiv = document.querySelector("#result");
    resultDiv.textContent = ""; // Empty results section everytime a race is selected and a function is called.
    let fieldset = document.createElement("fieldset");

    let heading = document.createElement("legend");
    heading.textContent = "Results";
    heading.className = "constructorbig";
    fieldset.appendChild(heading);
    // Take top three drivers, sort them into order. This should work despite adding filters and sorting the input data provided for the table below.
    let topThreePositions = filteredResults.filter((fr) => {return fr.position == 1 || fr.position == 2 || fr.position == 3});
    topThreePositions.sort( function (a,b){return a.position - b.position} );  //REFERENCE: https://www.w3schools.com/js/js_array_sort.asp

    
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
        rankDiv.addEventListener("click", () => displayDriverPopUp(p, race, resultsData, qualifyingData));
        topThreeDiv.appendChild(rankDiv);
    });
    fieldset.appendChild(topThreeDiv);

    //Now we display all the results in a table below the top 3.
    let resultTable = document.createElement("table");
    resultTable.className = "interactiveTable";
    let headingRow = document.createElement("tr");
    let thPosition = document.createElement("th");
    thPosition.textContent = filteredResults[0].position < filteredResults[1].position ? "Pos ▽" : "Pos △"; //Heading changes based on sort criteria, giving users a visual cue.
    thPosition.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionResults("position", race, filteredResults, resultsData)}});
    let thName = document.createElement("th");
    thName.textContent = (filteredResults[0].driver.forename)<(filteredResults[1].driver.forename) ? "Name A-Z" : "Name Z-A"; 
    thName.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByNameResults(race, filteredResults ,resultsData)}});
    let thConst = document.createElement("th");
    thConst.textContent = (filteredResults[0].constructor.name)<(filteredResults[15].constructor.name) ? "Constructor A-Z" : "Constructor Z-A";
    thConst.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByConstructorResults(race, filteredResults ,resultsData)}});
    let thLaps = document.createElement("th");
    thLaps.textContent = filteredResults[0].laps < filteredResults[19].laps ? "Laps ▽" : "Laps △"; //Number of laps and points always the driver position, hence we did not deem it required to sort by laps or points.
    thLaps.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionResults("laps", race, filteredResults, resultsData)}});
    let thPts = document.createElement("th");
    thPts.textContent = filteredResults[0].points < filteredResults[19].points ? "Pts ▽" : "Pts △";
    thPts.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionResults("points", race, filteredResults, resultsData)}});

    headingRow.append(thPosition, thName, thConst, thLaps, thPts);
    resultTable.appendChild(headingRow);

    filteredResults.forEach((r) => {

        let resultRow = document.createElement("tr");
        let resultPos = document.createElement("td");
        resultPos.textContent = r.position;
        let resultName = document.createElement("td");
        resultName.textContent = displayFavorites(`${r.driver.forename} ${r.driver.surname}`);
        let resultCons = document.createElement('td');
        resultCons.textContent = displayFavorites(`${r.constructor.name}`);
        let resultLaps = document.createElement("td");
        resultLaps.textContent = r.laps;
        let resultPts = document.createElement("td");
        resultPts.textContent = r.points;

        resultRow.append(resultPos, resultName, resultCons, resultLaps, resultPts);
        resultTable.appendChild(resultRow);

        resultName.addEventListener("click", () => displayDriverPopUp(r, race, resultsData, qualifyingData));
        resultCons.addEventListener("click", () => displayConstructorPopUp(r, race, resultsData, qualifyingData));
    });

    fieldset.appendChild(resultTable);
    resultDiv.appendChild(fieldset);

};


/**
 * This function displays the qualifying table in a similar fashion as the results table.
 * @param {Race object} race 
 * @param {Array} qualifyingData 
 * @param {Array} resultsData 
 */
function displayQualifyingData(race, qualifyingData, resultsData){
    // Filter the qualifying data for our specific race.
    let selectedRace = race.id;
    let filteredQualifying = qualifyingData.filter((q) => {
        return q.race.id == selectedRace;
    });

    
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
    thPosition.textContent =  filteredQualifying[0].position < filteredQualifying[1].position ? "Pos ▽" : "Pos △";
    thPosition.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByPositionQualifying(race, filteredQualifying, resultsData)}});
    let thName = document.createElement("th");
    thName.textContent =  (filteredQualifying[0].driver.forename)<(filteredQualifying[1].driver.forename) ? "Name A-Z" : "Name Z-A";
    thName.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByNameQualifying(race, filteredQualifying ,resultsData)}});
    let thConst = document.createElement("th");
    thConst.textContent =  (filteredQualifying[0].constructor.name)<(filteredQualifying[15].constructor.name) ? "Constructor A-Z" : "Constructor Z-A"; //compares values far apart to make sure they aren't always the same (first two can be the same constructor).
    thConst.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByConstructorQualifying(race, filteredQualifying ,resultsData)}});
    let thQ1 = document.createElement("th");
    thQ1.textContent = (filteredQualifying[0].q1)<(filteredQualifying[1].q1) ? "Q1 ▽" : "Q1 △";
    thQ1.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByQQualifying( 1 , race, filteredQualifying ,resultsData)}});
    let thQ2 = document.createElement("th");
    thQ2.textContent = (filteredQualifying[0].q2)<(filteredQualifying[15].q2) ? "Q2 ▽" : "Q2 △"; //compares values far apart to make sure they aren't always the same (first two can be null).
    thQ2.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByQQualifying( 2 , race, filteredQualifying ,resultsData)}});
    let thQ3 = document.createElement("th");
    thQ3.textContent = (filteredQualifying[0].q3)<(filteredQualifying[15].q3) ? "Q3 ▽" : "Q3 △";
    thQ3.addEventListener("click", (e) => {
        if(e.target && e.target.nodeName == "TH"){sortByQQualifying( 3 , race, filteredQualifying ,resultsData)}});

    headingRow.append(thPosition, thName, thConst, thQ1, thQ2, thQ3);
    qualifyTable.appendChild(headingRow);

    filteredQualifying.forEach((q) =>{
        let qualifyRow = document.createElement("tr");
        let qualifyPos = document.createElement("td");
        qualifyPos.textContent = q.position;
        let qualifyName = document.createElement("td");
        qualifyName.textContent = displayFavorites(`${q.driver.forename} ${q.driver.surname}`);
        qualifyName.addEventListener("click", () => displayDriverPopUp(q, race, resultsData, qualifyingData));
        let qualifyConst = document.createElement("td");
        qualifyConst.textContent = displayFavorites(`${q.constructor.name}`);
        qualifyConst.addEventListener("click", () => displayConstructorPopUp(q, race, resultsData, qualifyingData));
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

export {displayRaceData, displayRaces, displayQualifyingData, displayResultsData};