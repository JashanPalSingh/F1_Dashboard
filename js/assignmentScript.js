function createSeasonList(){
    let list = document.createElement("select");
    let article = document.querySelector("#description");
    for (let i= 2024; i>2013; i--){
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        list.appendChild(option);
    }
    article.appendChild(list);
}