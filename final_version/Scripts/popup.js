// global category list
CATEGORIES = {'gundem':0, 'dunya':1, 'ekonomi':2, 'spor':3, 'seyahat':4, 'video':5, 'kelebek':6, 'yazarlar':7};

// Get already saved settings of the news filter
chrome.storage.local.get('checkedList', function(result){
    var keys = Object.keys(result.checkedList);
    console.log("At the beginning: ", keys);
    for (var i=0; i< keys.length; i++){
        if (Array.isArray(result.checkedList[keys[i]])){
            cb = document.getElementById(CATEGORIES[keys[i]]);
            cb.checked = true;
        } 
    }
});

function getCheckedCategories() {
    var checkedBoxes = [];
    var categories = Object.keys(CATEGORIES);
    for (var i = 0; i < categories.length; i++){
        var checkbox = document.getElementById(String(i));
        if (checkbox.checked == true){
            checkedBoxes.push(categories[i]);
        }
    }
    return checkedBoxes;
}

function prepareJsonFormatToStore(data){
    keys = Object.keys(data['values']);
    console.log("KEYS:\n", keys);
    if (keys.length === 0){
        console.log('[WARNING] Ask to Uluc about API whether it\'s working or not... ');
    }
    newJsonData={};
    for (var i in keys){
        newJsonData[keys[i]] = data['values'][keys[i]]
        newJsonData[(keys[i]+"_index")] = 0
    }
    return newJsonData;
}

// Saves options to chrome.storage
function saveFilter(jsonData, t, url, selectedCategories) {

    // Save the list of checked checkBoxes
    chrome.storage.local.set({'checkedList': jsonData});
    chrome.storage.local.set({'lastUpdateTime': t});
    chrome.storage.local.set({'currentUrl': url});
    chrome.storage.local.set({'selectedCategories': selectedCategories});
    /*
    // Debug for local storage
    chrome.storage.local.get('lastUpdateTime', function(result){
        var lst = result.lastUpdateTime;
        console.log("popup.js lastupdatetime: ",lst);
    });
    */
}

function getSelectedCategories(){
    selectedCategories = getCheckedCategories(); // selectedCategories is just used for apiUrl editting
    var apiUrl ="*********"; // amazon apigateway url

    for (var i=0; i<selectedCategories.length;i++){
        if (i > 0){
            apiUrl += ',' + selectedCategories[i];
        }else{
            apiUrl += selectedCategories[i];
        }   
    }
    apiUrl += "&rate=20";
    console.log("Selected Categories", selectedCategories);
    console.log('Req URL', apiUrl);
   

    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    request.open('GET', apiUrl, true);
    request.onload = function () {
        var data = JSON.parse(String(this.response)); // Begin accessing JSON data here
        console.log('popup.js [DEBUG] data:', data);

        var json2store = prepareJsonFormatToStore(data);
        console.log("NEW JSON:\n", json2store);
        saveFilter(json2store, new Date().getTime(), apiUrl, selectedCategories);
    }
    request.send();
}

// Button Clicked Event Function
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('saveButton');
    link.addEventListener('click', function() {
        getSelectedCategories();
    });
});