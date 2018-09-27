
// Get already saved settings of the news filter
chrome.storage.sync.get(['checkedList'], function(result) {
    var i;
    for (i=0; i<result.checkedList.length; i++){
        cb = document.getElementById(result.checkedList[i]);
        cb.checked = true;
    }
});

// Button Clicked Event Function
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('saveButton');
    // onClick's logic below:
    link.addEventListener('click', function() {
        countChecked();
    });
});


function countChecked() {
    var checkedBoxes = [];
    var i;
    for (i=0; i<9;i++){
        var checkbox = document.getElementById(String(i));
        if (checkbox.checked == true){
            checkedBoxes.push(i);
        }
    }
    //document.write(checkedBoxes);
    saveFilter(checkedBoxes);
}

// Saves options to chrome.storage
function saveFilter(list) {
    // Save the list of checked checkBoxes
    chrome.storage.sync.set({
      checkedList: list
    });

    /*
    // Get Saved list and print it over document to debug
    chrome.storage.sync.get(['checkedList'], function(result) {
        document.write('Value currently is ' + result.checkedList);
      });
    */
  }