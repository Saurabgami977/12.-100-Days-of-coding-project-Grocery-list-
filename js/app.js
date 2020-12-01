//input tag
let input = document.getElementById('input');

//dom element
let groceryList = document.getElementById('groceryList');


//buttons
let submit = document.getElementById('submit');
let clearItems = document.getElementById('clearItems');

//initializing array
let itemArray = [];
// localStorage items variable
let localItems;

submit.addEventListener('click', addToList);


function addToList() {
    itemArray.push(input.value);
    input.value = '';
    localStorage.setItem('grocery', JSON.stringify(itemArray));
    localItems = JSON.parse(localStorage.getItem('grocery'));
    checkStorage();
}

checkStorage()

function checkStorage(){
    if(localItems == undefined){
        groceryList.innerHTML = `<h1>Nothing to show</h1>`
    }else{
        groceryList.innerHTML = ''
        populate();
    }
}

function populate(){
    localItems.forEach(element => {
        itemArray.push(element);
    });
    
    let html = '';

    itemArray.forEach((element, index) => {
        html += `<div class="item" id="item${index}">
                        <h3 class="groceryItemName">${element}</h3>
                        <img src="../img/trash.svg" alt="" class="deleteIcon" id="deleteIcon">
                </div>`

    })
    groceryList.innerHTML = html;


}
