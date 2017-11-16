var listItems;
var listObject = document.getElementById('mainList');

var cookieName = "todolistcookie";

var addingItem = false;

$(document).ready(function () {
    document.cookie = "";
    //Load existing todolist from cookie
    listItems = loadListFromCookie();
    
    //If there is no cookie, start from scratch
    if (listItems == null) {
        listItems = [];
    }
    //Otherwise, use the loaded array to generate a list
    else {
        var newList = [];
        for (i = 0; i < listItems.length; i++) {
            newList.push(addLoadedItemToList(listItems[i].title, listItems[i].desc, listItems[i].complete, i));
        }
    }
    
    //TODO: there's a problem where data-id is often one higher than it should be. Ctrl+F '-1' to find and fix once problem is resolved.
    
});


function addItemToList() {
    
    if (addingItem)
        return;
    else
        addingItem = true;
    
    var itemToAdd = document.createElement("DIV");
    
    itemToAdd.classList.add("listItem");
    
    var childBox = document.createElement("IMG");
    var childTitle = document.createElement("INPUT");
    var childDesc = document.createElement("INPUT");
    var childConfirm = document.createElement("BUTTON");
    
    childBox.classList.add("itemBox");
    childTitle.classList.add("itemTitle");
    childDesc.classList.add("itemDesc");
    childConfirm.classList.add("itemConfirm");
    
    childBox.setAttribute("src", "./images/ui_box.png");
    childConfirm.setAttribute("onclick", "confirmItem(this)");
    
    //Give the HTML element an ID so we can look it up in the array later
    itemToAdd.setAttribute("data-id", listItems.length);
    
    childTitle.placeholder = "What task?";
    childDesc.placeholder = "Description";
    
    
    itemToAdd.appendChild(childBox);
    itemToAdd.appendChild(childTitle);
    itemToAdd.appendChild(childDesc);
    itemToAdd.appendChild(childConfirm);
	
    listObject.appendChild(itemToAdd);
	
    
    //Make an object to represent the todolist item and give it a reference to the row
    
    
    var newItem = {
        title: "itemTitle",
        desc: "itemDesc",
        complete: false,
        element: itemToAdd
    };
    
    
    listItems.push(newItem);
    
    itemToAdd.style.height = "1px";
	setTimeout(function() { itemToAdd.style.height = "50px";}, 1)
}

function addLoadedItemToList(loadedTitle, loadedDesc, loadedComplete, arrayPosition) {
    
    var itemToAdd = document.createElement("DIV");
    
    itemToAdd.classList.add("listItem");
    
    var childBox = document.createElement("IMG");
    var childTitle = document.createElement("P");
    var childDesc = document.createElement("P");
    var childConfirm = document.createElement("BUTTON");
    
    childBox.classList.add("itemBox");
    childTitle.classList.add("itemTitle");
    childDesc.classList.add("itemDesc");
    childConfirm.classList.add("itemConfirm");
    
    if (!loadedComplete) {
        childBox.setAttribute("src", "./images/ui_box.png");
        childBox.setAttribute("onclick", "tickItem(this.parentElement)");
    } else {
        childBox.setAttribute("src", "./images/ui_boxTicked.png");
    }
    
    childConfirm.setAttribute("onclick", "deleteItem(this)");
    
	childConfirm.style.background = "url(./images/ui_cross.png)";
	childConfirm.style.backgroundSize = "contain";
    
    childTitle.textContent = loadedTitle;
    childDesc.textContent = loadedDesc;
    
    //Give the HTML element an ID so we can look it up in the array later
    itemToAdd.setAttribute("data-id", arrayPosition);
    
    itemToAdd.appendChild(childBox);
    itemToAdd.appendChild(childTitle);
    itemToAdd.appendChild(childDesc);
    itemToAdd.appendChild(childConfirm);
	
    listObject.appendChild(itemToAdd);
	
    
    //Make an object to represent the todolist item and give it a reference to the row
    
    var newItem = {
        title: loadedTitle,
        desc: loadedDesc,
        complete: loadedComplete,
        element: itemToAdd
    };
    
    itemToAdd.style.height = "1px";
	setTimeout(function() { itemToAdd.style.height = "50px";}, 1)
    
    return newItem;
}

function tickItem(item) {
    
    item.childNodes[0].src=('./images/ui_boxTicked.png');
    
    var itemIndex = parseInt(item.getAttribute("data-id"));
    
    console.log("item index is " + itemIndex + " and object at index is " + listItems[itemIndex]);
    
    listItems[itemIndex].complete = true;
    saveListToCookie();
}

function confirmItem(item) {
    //User wants to confirm the creation of a new task.
    //Convert the input fields to text fields and change the confirm button to a delete button.
    
    addingItem = false;
    
    var holder = item.parentElement;
    
    var newTitle = document.createElement("P");
    var newDesc = document.createElement("P");
    
    newTitle.classList.add("itemTitle");
    newDesc.classList.add("itemDesc");
    
    newTitle.textContent = holder.children[1].value;
    newDesc.textContent = holder.children[2].value;
    
    holder.children[0].setAttribute("onclick", "tickItem(this.parentElement)");
    holder.children[1].replaceWith(newTitle);
    holder.children[2].replaceWith(newDesc);
    
    item.setAttribute("onclick", "deleteItem(this)");
	item.style.background = "url(./images/ui_cross.png)";
	item.style.backgroundSize = "contain";
    
    //Now find the associated item in the array using the attribute we set earlier.
    //Apply the inputted text to the array item so it matches the corresponding DOM element.
    
    var arrayItem = listItems[parseInt(holder.getAttribute("data-id"))];
    arrayItem.title = newTitle.textContent;
    arrayItem.desc = newDesc.textContent;
    
	saveListToCookie();
    
}

function deleteItem(item) {
    
    if (addingItem)
        return;
    
    var index = parseInt(item.getAttribute("data-id"));
    
    item.parentElement.style.display = "none";
    listItems.splice(index, 1);
    
    //Starting from the item that replaced the item we removed, subtract one from every larger ID.
    //This shifts all the IDs down to make up for the missing one.
    
    for (i = index; i < listItems.length-1; i++) {
        
        console.log("id thing is " + listItems[i].element);
        
        //This line crashes sometimes if the item being deleted is at position 0 AND the list has more than 2 items in. WHY?
        //Uncaught TypeError: listItems[i].element.getAttribute is not a function
        var oldID = parseInt(listItems[i].element.getAttribute("data-id"));
        
        listItems[i].element.setAttribute("data-id", "" + oldID-1);
    }
        
        
	saveListToCookie();
}

function loadListFromCookie() {
    
    var savedList = null;
    
    savedList = getCookie('todo');
    
    if (savedList != null) {
        savedList = JSON.parse(savedList);        
    
        for (i = 0; i < savedList.length; i++) {
            var element = savedList[i];
            element.title = savedList[i].title;
            element.desc = savedList[i].desc;
        }
    
    }
	return savedList;
}

function saveListToCookie() {
    
    //alert("created cookie: " + document.cookie);
    
    /*
        Keep track of the DOM elements in the array by reassigning every element's 'data-id' attribute
        so that it corresponds to their position in the array.
    */
    
    for (i = 0; i < listItems.length; i++) {
        //console.log("item " + i + " is " + listItems[i].element.ty);
        //listItems[i].element.setAttribute("data-id", i);
    }
    
    var json_str = JSON.stringify(listItems);
    createCookie('todo', json_str, 7);
}

function createCookie(cookieName, cookieData, daysToLast) {
    
    var expires;
    if (daysToLast) {
        var date = new Date();
        date.setTime(date.getTime() + (daysToLast * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = cookieName + "=" + cookieData + expires + "; path=/";
}

function getCookie(cookieName) {
    
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    
    return null;
}

function clearCookie() {
    listItems = [];
    saveListToCookie();
}