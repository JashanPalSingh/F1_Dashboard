import { displayQualifyingData, displayResultsData } from "./displayRaces.js";

function sortByPositionQualifying(race, qualifyingData, resultsData){
    if(qualifyingData[0].position < qualifyingData[1].position){
        let reverseSortedQualifying = qualifyingData.sort(function (a,b){return b.position - a.position});
        displayQualifyingData(race, reverseSortedQualifying, resultsData);
    }
    else{
        let straightSortedQualifying = qualifyingData.sort(function (a,b){return a.position - b.position});
        displayQualifyingData(race, straightSortedQualifying, resultsData);
    }
}

function sortByNameQualifying(race, qualifyingData, resultsData){
    if(qualifyingData[0].driver.forename < qualifyingData[1].driver.forename){
        let reverseSortedQualifying = qualifyingData.sort(function (a,b){return (b.driver.forename).localeCompare(a.driver.forename)});  //Reference: https://www.freecodecamp.org/news/javascript-string-comparison-how-to-compare-strings-in-js/
        displayQualifyingData(race, reverseSortedQualifying, resultsData);
    }
    else{
        let straightSortedQualifying = qualifyingData.sort(function (a,b){return (a.driver.forename).localeCompare(b.driver.forename)});
        displayQualifyingData(race, straightSortedQualifying, resultsData);
    }
}

function sortByConstructorQualifying(race, qualifyingData, resultsData){
    if(qualifyingData[0].constructor.name < qualifyingData[15].constructor.name){
        let reverseSortedQualifying = qualifyingData.sort(function (a,b){return (b.constructor.name).localeCompare(a.constructor.name)});
        displayQualifyingData(race, reverseSortedQualifying, resultsData);
    }
    else{
        let straightSortedQualifying = qualifyingData.sort(function (a,b){return (a.constructor.name).localeCompare(b.constructor.name)});
        displayQualifyingData(race, straightSortedQualifying, resultsData);
    }
}


function sortByPositionResults(race, filteredResults, resultsData){
    if(filteredResults[0].position < filteredResults[1].position){
        let reverseSortedResults = resultsData.sort(function (a,b){return b.position - a.position});
        displayResultsData(race, reverseSortedResults);
    }
    else{
        let straightSortedResults = resultsData.sort(function (a,b){return a.position - b.position});
        displayResultsData(race, straightSortedResults);
    }
}

function sortByNameResults(race, filteredResults, resultsData){
    if(filteredResults[0].driver.forename < filteredResults[1].driver.forename){
        let reverseSortedResults = resultsData.sort(function (a,b){return (b.driver.forename).localeCompare(a.driver.forename)});
        displayResultsData(race, reverseSortedResults);
    }
    else{
        let straightSortedResults = resultsData.sort(function (a,b){return (a.driver.forename).localeCompare(b.driver.forename)});
        displayResultsData(race, straightSortedResults);
    }
}

function sortByConstructorResults(race, filteredResults, resultsData){
    if(filteredResults[0].constructor.name < filteredResults[15].constructor.name){
        let reverseSortedResults = resultsData.sort(function (a,b){return (b.constructor.name).localeCompare(a.constructor.name)});
        displayResultsData(race, reverseSortedResults);
    }
    else{
        let straightSortedResults = resultsData.sort(function (a,b){return (a.constructor.name).localeCompare(b.constructor.name)});
        displayResultsData(race, straightSortedResults);
    }
}

export{sortByPositionQualifying, sortByNameQualifying, sortByConstructorQualifying, sortByPositionResults, sortByNameResults, sortByConstructorResults};