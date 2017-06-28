//URL + API key for Zomato.com
//url = https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=
//API key = 858f948cc66e31e989a5e17f72be49e3

// create var for HTML button
	var btn = document.getElementById('btn');
// Create click method with a function to request data via GET from Zomato
	btn.addEventListener("click", function(){
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=858f948cc66e31e989a5e17f72be49e3");
	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.reponseText);
		
	};
	ourRequest.send();
})


