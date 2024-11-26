// JavaScript file or the Assignment 2
// Authors: Jashan Pal Singh, Ishan Ishan.

// Wait for the DOM content to load.
addEventListener( "DOMContentLoaded", function(){

    // Creates the season dropdown and the submit button within the home article.
    //When user presses the button, it executes another function via event handler. 
    function createSeasonList() {
    let list = document.createElement("select");
    list.className = 'seasonSelect';
    let article = document.querySelector("#description");
    for (let i= 2024; i>2013; i--){
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
function loadBrowse(value){
    //Hide home pane
    document.querySelector("#home").style.display = "none";
    let browse = document.querySelector("#browse");
    let para= document.createElement("p");
    para.textContent = "Browser content";
    //display browse pane
    browse.classList.toggle("hidden");
    browse.appendChild(para);
}


});
