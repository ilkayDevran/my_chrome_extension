
var past = new Date();
console.log("Start:", past)

chrome.storage.sync.get(['lastUpdateTime'], function(result) {
    past = result.lastUpdateTime;
    var oneHour = 1000 * 60 * 60;
    var isPast = (new Date().getTime() - past < oneHour)?false:true;
    console.log("In chrome part:", past) 
});

console.log("End:", past)


/*var past = new Date(yourTimeString).getTime();
var fiveMin = 1000 * 60 * 5; 
var isPast = (new Date().getTime() - past < fiveMin)?false:true;
console.log(isPast)
*/




var oneHour = 1000 * 60 * 60; 
var isPast = (new Date().getTime() - past < oneHour)?false:true;


/*
var past = new Date().getTime();
var oneHour = 1000 * 60 * 60; 
var isPast = (new Date().getTime() - past < oneHour)?false:true;
console.log(past)
console.log(new Date().getTime())
console.log(isPast)
*/