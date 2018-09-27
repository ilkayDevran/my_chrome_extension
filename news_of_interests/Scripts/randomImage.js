	var img=document.getElementById("mainImg");
	var sources=["https://eduworld.sk/image.php?cfg=clanok_detail&f=clanky%2Falbert_einstein_2_1516785959.PNG",
				"https://cdn.yemek.com/mncrop/940/625/uploads/2017/12/albert-einstein-mutluluk-formulu.jpg",
				"https://boygeniusreport.files.wordpress.com/2017/06/einstein.jpg?quality=98&strip=all&w=782",
				"http://i.hurimg.com/i/hurriyet/75/750x422/5ab9fd467af50713ec6f5516.jpg",
				"http://www.nkfu.com/wp-content/uploads/2013/01/Albert-Einstein-resimleri-16.jpg",
				"https://i.ytimg.com/vi/PWDhPmStgb0/maxresdefault.jpg"
	];
	function x(){
		var randomIndice=Math.floor(Math.random()*sources.length);
		console.log(randomIndice);
		img.src=sources[randomIndice];
	};

  x();