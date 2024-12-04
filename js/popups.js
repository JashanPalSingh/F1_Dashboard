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

            let favPopUp = document.createElement("a");
            favPopUp.textContent = "Add/Remove ♡";
            favPopUp.className = "decoratedLink";
            favPopUp.addEventListener("click", () => addToFavorites(`${driver.forename} ${driver.surname}`));

            driverBio.append( driverImage, driverNumber, driverName, driverDOB, driverNationality, document.createElement("br"), driverURL, favPopUp, closePopUp, document.createElement("br"), document.createElement("br"));
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
            constName.textContent = `${constructor.name}`;
            constName.className = "constructorbig";
            let constNationality = document.createElement("h2");
            constNationality.textContent = `Nationality: ${constructor.nationality}`;
            let constURL =  document.createElement("a");
            constURL.href = constructor.url;
            constURL.textContent = "View Constructor";
            constURL.className = "decoratedLink";
            let constImage = document.createElement("img");
            constImage.src = "https://placehold.co/300x100?text=Constructor+Banner";

            let closePopUp = document.createElement("a");
            closePopUp.textContent = "Close";
            closePopUp.className = "decoratedLink";
            closePopUp.addEventListener("click", () => {constPopUp.style.display = "none"});

            let favPopUp = document.createElement("a");
            favPopUp.textContent = "Add/Remove ♡";
            favPopUp.className = "decoratedLink";
            favPopUp.addEventListener("click", () => addToFavorites(`${constructor.name}`));

            constBio.append(constName, constNationality, constImage, document.createElement("br"),document.createElement("br"), constURL ,document.createElement("br"), document.createElement("br"), favPopUp, closePopUp);
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

    let favPopUp = document.createElement("a");
    favPopUp.textContent = "Add/Remove ♡";
    favPopUp.className = "decoratedLink";
    favPopUp.addEventListener("click", () => addToFavorites(`${race.circuit.name}`));

    fieldset.append(circuitImage, circuitName, circuitLocation, circuitCountry, circuitURL, favPopUp, closePopUp, document.createElement("br"), document.createElement("br"));
    circuitPopUp.appendChild(fieldset);

}

let favourites = [];

function displayFavorites(text){
    let nameFound = favourites.find((f) => {
        return f == text;
    });

    if (! nameFound){
        return text;
    }
    else{
        return (text + "♥️");
    }
    
}

function addToFavorites(text){
    let nameFound = favourites.find((f) => {
        return f == text;
    });
    if (! nameFound){
        favourites.push(text);
        displayFavorites(text);
        alert(`${text} is added to favorites!`);
    }
    else{
        let index = favourites.indexOf(text)
        if (index !== -1) {
            // Remove the element at the found index
            favourites.splice(index, 1);
        }
        alert(`${text} is removed from favorites!`);
    }

}

// Export the functions
export { displayDriverPopUp, displayConstructorPopUp, displayCircuitPopUp, displayFavorites};