var sources=["http://www.hurriyet.com.tr/gundem/",
				"http://www.hurriyet.com.tr/dunya/",
				"http://www.hurriyet.com.tr/ekonomi/",
                "http://www.hurriyet.com.tr/sporarena/",
                "http://www.hurriyet.com.tr/seyahat/",
                "http://www.hurriyet.com.tr/video/",
                "http://www.hurriyet.com.tr/kelebek-magazin/",
                "http://www.hurriyet.com.tr/son-dakika/",
                "http://www.hurriyet.com.tr/yazarlar/" ];

var metaTag=document.getElementById("metaTag");
var randomIndice = 0;

function get_random_link_from_filter(){
    
    chrome.storage.sync.get(['checkedList'], function(result) {
        randomIndice=Math.floor(Math.random() * result.checkedList.length);
        metaTag.setAttribute("content", '0;URL='+String(sources[result.checkedList[randomIndice]]) );   
        //document.write('random:'+randomIndice +String(sources[result.checkedList[randomIndice]]) + 'Value currently is ' + result.checkedList + ' LEN:' + result.checkedList.length);
    });
}

get_random_link_from_filter();