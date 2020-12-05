//input tag
let input = document.getElementById('input');
input.focus();

//clear all items
let clearAll = document.getElementById('clearItems');

//dom element
let groceryList = document.getElementById('groceryList');


//buttons
let submit = document.getElementById('submit');
let clearItems = document.getElementById('clearItems');

//initializing array
let itemArray = [];


//adding event listner in submit btton and enter key press
submit.addEventListener('click', addToList);
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        addToList();
    }
})


// localStorage items variable
let localItems = JSON.parse(localStorage.getItem('grocery'));

//running addtolist to add the individual items to the array and populating doms
function addToList() {
    if (input.value.length > 0) {
        itemArray.push(input.value);
        input.value = '';
        localStorage.setItem('grocery', JSON.stringify(itemArray));
        localItems = JSON.parse(localStorage.getItem('grocery'));
        populate();
        location.reload();
    } else {
        document.getElementById('inputFeedback').style.display = 'block';
        setTimeout(() => {
            document.getElementById('inputFeedback').style.display = 'none'
        }, 3000);
    }
}

//checking storage on  window load
window.onload = checkStorage()

//check storage
function checkStorage() {
    if (localItems == undefined || localItems.length <= 0) {
        groceryList.innerHTML = `<h1>Nothing to show</h1>`
    } else {
        groceryList.innerHTML = '';
        populate();
    }
}

//populate dom
function populate() {
    itemArray = [];
    localItems.forEach(element => {
        itemArray.push(element);
    });

    let html = '';

    itemArray.forEach((element, index) => {
        html += `<div class="item" id="item${index + 1}">
                        <h3 class="groceryItemName">${element}</h3>
                        <img src="trash.svg" alt="" class="deleteIcon" id="deleteIcon${index + 1}">
                </div>`

    })
    groceryList.innerHTML = html;


}

//function to clear all items

clearAll.addEventListener('click', deleteAll);

function deleteAll() {
    if (itemArray.length > 0) {

        if (window.confirm('Do you really want to delete all the items')) {
            itemArray = [];
            localItems.length = 0;
            localStorage.removeItem('grocery')
            checkStorage();
            document.getElementById('deleteFeedback').style.display = 'block'
            setTimeout(() => {
                document.getElementById('deleteFeedback').style.display = 'none'
            }, 2000);
        }
    }else{
        document.getElementById('deleteFeedback').style.display = 'block';
        document.getElementById('deleteFeedback').innerText = 'Nothing to Delete';
        setTimeout(() => {
            document.getElementById('deleteFeedback').style.display = 'none';
        }, 2000);
        
    }
}



//function to delete each individual items
let deleteIcon = document.querySelectorAll('.deleteIcon');

deleteIcon.forEach(element => {
    element.addEventListener('click', () => {
        let toDelete = element.parentElement.innerText.toString();
        itemArray.forEach((item, index) => {
            if (item == toDelete) {
                itemArray.splice(index, 1);
                localStorage.setItem('grocery', JSON.stringify(itemArray));
                checkStorage();
                location.reload();
            } else {
                // console.log(index)
            }
        })
    });

})
