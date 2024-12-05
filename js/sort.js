// This javaScript file manages all the sort methods implemented on the qualifying and results tables.
// @authors: Jashan Pal Singh, Ishan Ishan

//Import functions from displayRaces.js to call them again further down.
import { displayQualifyingData, displayResultsData } from "./displayRaces.js";

/**
 * Sorts the source Array by position within the qualifying table. then, calls the display function of the table, providing the new Array parameter. 
 * @param {Race object} race 
 * @param {Array} qualifyingData 
 * @param {Array} resultsData 
 */
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
/**
 * Sorts the source Array by driver's forename within the qualifying table. then, calls the display function of the table, providing the new Array parameter.
 * @param {Race object} race 
 * @param {Array} qualifyingData 
 * @param {Array} resultsData 
 */
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
/**
 * Sorts the source Array by constructor's name within the qualifying table. then, calls the display function of the table, providing the new Array parameter.
 * @param {Race object} race 
 * @param {Array} qualifyingData 
 * @param {Array} resultsData 
 */
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

/**
 * Sorts the source Array by position within the results table. then, calls the display function of the table, providing the new Array parameter.
 * @param {Race object} race 
 * @param {Array} filteredResults 
 * @param {Array} resultsData 
 */
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

/**
 * Sorts the source Array by driver's forename within the results table. then, calls the display function of the table, providing the new Array parameter.
 * @param {Race object} race 
 * @param {Array} filteredResults 
 * @param {Array} resultsData 
 */
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

/**
 * Sorts the source Array by constructor's name within the results table. then, calls the display function of the table, providing the new Array parameter.
 * @param {Race object} race 
 * @param {Array} filteredResults 
 * @param {Array} resultsData 
 */
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

/**
 * Sorts the source Array by Q1/Q2/Q3 within the qualifying table. then, calls the display function of the table, providing the new Array parameter.
 * @param {number} num 
 * @param {Race object} race 
 * @param {Array} qualifyingData 
 * @param {Array} resultsData 
 */
function sortByQQualifying(num, race, qualifyingData, resultsData){
    let qnumber = `q${num}`;
    if(qualifyingData[4][qnumber] < qualifyingData[14][qnumber]){ //using number other than 0 and 1 makes sure in most cases both aren't zero.
        let reverseSortedQualifying = qualifyingData.sort(function (a,b){return (b[qnumber]).localeCompare(a[qnumber])});
        displayQualifyingData(race, reverseSortedQualifying, resultsData);
    }
    else{
        let straightSortedQualifying = qualifyingData.sort(function (a,b){return (a[qnumber]).localeCompare(b[qnumber])});
        displayQualifyingData(race, straightSortedQualifying, resultsData);
    }
}

export{sortByQQualifying, sortByPositionQualifying, sortByNameQualifying, sortByConstructorQualifying, sortByPositionResults, sortByNameResults, sortByConstructorResults};