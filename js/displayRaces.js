//import data
import { displayDriverPopUp, displayConstructorPopUp, displayCircuitPopUp } from './popups.js';


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
        // console.log(r);
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
        qualifyName.addEventListener("click", () => displayDriverPopUp(q, resultsData));
        let qualifyConst = document.createElement("td");
        qualifyConst.textContent = q.constructor.name;
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


function displayDriverPopUp(q, resultsData){
    // console.log(q);
    // console.log(resultsData);
    let DriverPopUp = document.querySelector("#driverPopUp");
    DriverPopUp.textContent = "";
    DriverPopUp.style.display = "block";
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.className = "constructorbig";
    legend.textContent = "Driver Details";
    fieldset.appendChild(legend);

    let driverBio = document.createElement("div");
    fieldset.appendChild(driverBio);
    let driverRecord = document.createElement("div");
    

    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?id=${q.driver.id}`).then(resp => resp.json()).then(data => {displayDriverBio(data)});
        function displayDriverBio(driver){
            let driverImage = document.createElement("img");
            driverImage.className = "dcImage"
            driverImage.src = "https://placehold.co/300x100?text=Driver+Banner+Image";
            let driverNumber = document.createElement("h2");
            driverNumber.textContent = `#${driver.number}`;
            driverNumber.className = "big";
            let driverName = document.createElement("h2");
            driverName.textContent = `${driver.forename} ${driver.surname}`;
            let driverDOB = document.createElement("h2");
            driverDOB.textContent = `Birth: ${driver.dob}`;
            let driverNationality = document.createElement("h2");
            driverNationality.textContent = `${driver.nationality}`;
            let driverURL =  document.createElement("a");
            driverURL.href = driver.url;
            driverURL.textContent = "See Driver";
            driverURL.className = "decoratedLink";

            let closePopUp = document.createElement("a");
            closePopUp.textContent = "Close";
            closePopUp.className = "decoratedLink";
            closePopUp.addEventListener("click", () => {DriverPopUp.style.display = "none"});
            driverBio.append( driverImage, driverNumber, driverName, driverDOB, driverNationality, document.createElement("br"), driverURL, closePopUp, document.createElement("br"), document.createElement("br"));
    }

    function driverRes(q, resultsData){
        let selectedDriver = q.driver.id;
        let filteredDriverResults = resultsData.filter((d) => {
            return d.driver.id == selectedDriver;
        });
        // console.log(filteredDriverResults);
        let driveTable = document.createElement("table");
        driveTable.id = "driversTable";
        let headingRow = document.createElement("tr");
        let thRnd = document.createElement("th"); 
        thRnd.textContent = "Rnd";
        let thName = document.createElement("th");
        thName.textContent = "Name";   
        let thPos = document.createElement("th");
        thPos.textContent = "Pos";  
        let thPts = document.createElement("th");
        thPts.textContent = "Points";  
    
        headingRow.append(thRnd, thName, thPos, thPts);
        driveTable.append(headingRow);
    
        filteredDriverResults.forEach((r) => {
            // console.log(r);
            let resultRow = document.createElement("tr");
            let resultRnd = document.createElement("td");
            resultRnd.textContent = r.race.round;
            let resultName = document.createElement("td");
            resultName.textContent = r.race.name; 
            let resultPos = document.createElement('td');
            resultPos.textContent = r.position; 
            let resultPts = document.createElement("td");
            resultPts.textContent = r.points;
    
            resultRow.append(resultRnd, resultName, resultPos, resultPts);
            driveTable.appendChild(resultRow);
        });
        driverRecord.appendChild(driveTable);
        fieldset.appendChild(driverRecord);
}
driverRes(q, resultsData);
DriverPopUp.appendChild(fieldset);
};

function displayConstructorPopUp(q, resultsData){
    let constPopUp = document.querySelector("#constructorPopUp");
    constPopUp.textContent = "";
    constPopUp.style.display = "block";
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.className = "constructorbig";
    legend.textContent = "Constructor Details";
    fieldset.appendChild(legend);

    let constBio = document.createElement("div");
    constBio.setAttribute("id", "constBio");
    fieldset.appendChild(constBio);
    let constRecord = document.createElement("div");
    constRecord.setAttribute("id", "recordTable");

    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?id=${q.constructor.id}`).then(resp => resp.json()).then(data => {displayConstructorBio(data)});
        function displayConstructorBio(constructor){
            let constName = document.createElement("h2");
            constName.textContent = `Name: ${constructor.name}`;
            let constNationality = document.createElement("h2");
            constNationality.textContent = `Nationality: ${constructor.nationality}`;
            let constURL =  document.createElement("a");
            constURL.href = constructor.url;
            constURL.textContent = "View Constructor";
            constURL.className = "decoratedLink";
            let constImage = document.createElement("img");
            constImage.src = "https://placehold.co/300x300?text=Constructor+Image";

            let closePopUp = document.createElement("a");
            closePopUp.textContent = "Close";
            closePopUp.className = "decoratedLink";
            closePopUp.addEventListener("click", () => {constPopUp.style.display = "none"});
            constBio.append(constName, constNationality, constImage, document.createElement("br"),document.createElement("br"), constURL, closePopUp);
    }

    function constRes(q, resultsData){
        let selectedConst = q.constructor.id;
        let filteredConstResults = resultsData.filter((c) => {
            return c.constructor.id == selectedConst;
        });
        // console.log(filteredConstResults);
        let constTable = document.createElement("table");
        constTable.id = "constructorTable";
        let headingRow = document.createElement("tr");
        let thRnd = document.createElement("th"); 
        thRnd.textContent = "Rnd";
        let thName = document.createElement("th");
        thName.textContent = "Name";
        let thDriver = document.createElement("th");
        thDriver.textContent = "Driver";   
        let thPos = document.createElement("th");
        thPos.textContent = "Pos";  
        let thPts = document.createElement("th");
        thPts.textContent = "Points";  
    
        headingRow.append(thRnd, thName, thDriver, thPos, thPts);
        constTable.append(headingRow);
    
        filteredConstResults.forEach((r) => {
            // console.log(r);
            let resultRow = document.createElement("tr");
            let resultRnd = document.createElement("td");
            resultRnd.textContent = r.race.round;
            let resultName = document.createElement("td");
            resultName.textContent = r.race.name;
            let driverName = document.createElement("td");
            driverName.textContent = r.driver.forename + r.driver.surname;
            let resultPos = document.createElement('td');
            resultPos.textContent = r.position; 
            let resultPts = document.createElement("td");
            resultPts.textContent = r.points;

            resultRow.append(resultRnd, resultName, driverName, resultPos, resultPts);
            constTable.appendChild(resultRow);
        });
        constRecord.appendChild(constTable);
        fieldset.appendChild(constRecord);
    }

    constRes(q, resultsData);
    constPopUp.appendChild(fieldset);
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

    let circuitImage = document.createElement("img");
    circuitImage.src = "https://placehold.co/300x400?text=Circuit+Image";
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

    fieldset.append(circuitImage, circuitName, circuitLocation, circuitCountry, circuitURL, closePopUp, document.createElement("br"), document.createElement("br"));
    circuitPopUp.appendChild(fieldset);

}

export {displayRaces};