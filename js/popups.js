// This JavaScript file manages all our pop-ups displayed when a user clicks on a driver, constructor, or a circuit 
// in the browse Pane. We also work with adding/removing an item from favourites.

// @authors: Jashan Pal Singh, Ishan Ishan.


/**
 * This function displays the driver pop-up using the dialog element.
 * it is passed a single results/qualifying element with driver id inside 
 * along with the resultsData array to filter through for the driver.
 * @param {quaifying} q 
 * @param {Array} resultsData 
 */
function displayDriverPopUp(q, resultsData){

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
    
    // fetch driver's biodata from an external API
    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?id=${q.driver.id}`).then(resp => resp.json()).then(data => {displayDriverBio(data)});
        function displayDriverBio(driver){
            let driverImage = document.createElement("img");
            driverImage.className = "dcImage"
            driverImage.src = "https://placehold.co/300x100?text=Driver+Banner+Image"; // Used the assignment's recommended method for adding a placeholder image.
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
            closePopUp.addEventListener("click", () => {DriverPopUp.style.display = "none"}); // hides driver pop-up 

            let favPopUp = document.createElement("a");
            favPopUp.textContent = "Add/Remove ♡";
            favPopUp.className = "decoratedLink";
            favPopUp.addEventListener("click", () => addToFavorites(`${driver.forename} ${driver.surname}`));

            driverBio.append( driverImage, driverNumber, driverName, driverDOB, driverNationality, document.createElement("br"), driverURL, favPopUp, closePopUp, document.createElement("br"), document.createElement("br"));
    }

    // Displays the driver's season stats for all races they participated in.
    function driverRes(q, resultsData){
        let selectedDriver = q.driver.id;
        let filteredDriverResults = resultsData.filter((d) => {
            return d.driver.id == selectedDriver;
        });

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



/**
 * Displays the constructor pop-up.
 * takes in the single result/qualifying entry with the constructor's id within, along with the whole resultsData array to filter.
 * @param {qualifying} q 
 * @param {Array} resultsData 
 */
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

    // fetches for the constructor's biodata from an external API.
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
            constImage.src = "https://placehold.co/300x100?text=Constructor+Banner"; //Used the recommended method of displaying a placeholder image.

            let closePopUp = document.createElement("a");
            closePopUp.textContent = "Close";
            closePopUp.className = "decoratedLink";
            closePopUp.addEventListener("click", () => {constPopUp.style.display = "none"});

            let favPopUp = document.createElement("a");
            favPopUp.textContent = "Add/Remove ♡";
            favPopUp.className = "decoratedLink";
            favPopUp.addEventListener("click", () => addToFavorites(`${constructor.name}`));

            // wierdly, we struggled with adding line breaks. This way was the easiest to implement.
            constBio.append(constName, constNationality, constImage, document.createElement("br"),document.createElement("br"), constURL ,document.createElement("br"), document.createElement("br"), favPopUp, closePopUp);
    }

    // Displays the constructor's statistics for the selected season.
    function constRes(q, resultsData){
        let selectedConst = q.constructor.id;
        let filteredConstResults = resultsData.filter((c) => {
            return c.constructor.id == selectedConst;
        });
        
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

/**
 * This function displays the circuit selected.
 * @param {race} race 
 */
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
//An empty list of favourites when the website is first opened.
let favourites = [];

/**
 * Function to display a heart sybol in fron of a name if it is within the favourites.
 * @param {String} text 
 * @returns {String} 
 */
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

/**
 * Function to facilitate adding/removing an element to favourites.
 * alerts the user of their action when initiated.
 * @param {String} text 
 */
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

// Export the functions to be used by other JavaScript files.
export { displayDriverPopUp, displayConstructorPopUp, displayCircuitPopUp, displayFavorites};