
function updateFilter(jsonData, t) {
    // Save the list of checked checkBoxes
    chrome.storage.local.set({'checkedList': jsonData});
    chrome.storage.local.set({'lastUpdateTime': t});
    
    // Debug for local storage
    chrome.storage.local.get('checkedList', function(result){
        var lst = result.checkedList;
        console.log("locallll: ",lst);
    });   
}

function prepareJsonFormatToStore(data){
    keys = Object.keys(data['values']);
    //console.log("[prepareJsonFormatToStore] KEYS:\n", keys);
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

// main() is here
chrome.storage.sync.get('lastUpdateTime', function(result) {
    //window.location.href = " www.hurriyet.com.tr/galeri-bu-halde-konusmayayim-41018096";
    var lastUpdate = result.lastUpdateTime; // get last update time from local storage
    console.log('[DEBUG] lastupdate: ', lastUpdate);
    
    chrome.storage.local.get('checkedList', function(result){
        var checkedList = result.checkedList;
        //console.log('[DEBUG] Result from checklist: ', checkedList);
        
        chrome.storage.local.get('selectedCategories', function(result){
            // TODO: Feed user here...
            console.log('[DEBUG] Result from checklist: ', checkedList);
            var randomCategory = result.selectedCategories[Math.floor(Math.random() * result.selectedCategories.length)];
            console.log("random category: ", randomCategory);
            var showedUrl = checkedList[randomCategory][checkedList[randomCategory+"_index"]];
            console.log("This url is going to be showed baby!: ", showedUrl);
            //window.location.href = checkedList[randomCategory][checkedList[randomCategory+"_index"]];
            //burda kaldınnnn!!!


            // TODO: Check Time
            //var lastUpdate = result.lastUpdateTime; // get last update time from local storage
            var oneHour = 1000 * 60 * 60;
            var isOneHour = (new Date().getTime() - lastUpdate < oneHour)?false:true; // check time

            if (!isOneHour){
                var randomIndice=Math.floor(Math.random() * checkedList.length);
                
                chrome.storage.local.get('currentUrl', function(result){
                    var apiUrl = result.currentUrl;
                    console.log("current URL ", apiUrl);
                    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                    request.open('GET', apiUrl + "&rate=20", true);
                    request.onload = function () {
                        var data = JSON.parse(String(this.response)); // Begin accessing JSON data here
                        console.log('if----[DEBUG] data:', data);

                        var json2store = prepareJsonFormatToStore(data);
                        console.log("NEW JSON:\n", json2store);
                        updateFilter(json2store, new Date().getTime());
                    }
                    request.send();
                });  
            } // if end
            else{
                console.log("DONE!")
            }
        }); 
    });

});