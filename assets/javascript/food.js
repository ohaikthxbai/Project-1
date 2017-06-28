	function renderFoodInfo(){
		var food = $(this).attr("data-name");
		var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=" + restaurant + "858f948cc66e31e989a5e17f72be49e3";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var foodDiv = ("<div class='food-view'>");

		var rName = response.name;

		var rView = $("<p>").text("Name" + name);

		foodDiv.append(rView);
	})
}




/*
//Var that points towards the div in the HTML
	var foodContainer = document.getElementById("food");
//Var for HTML button
	var btn = document.getElementById("btn");
//Click method with a function to request data via GET from Zomato
	btn.addEventListener("click", function(){
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=858f948cc66e31e989a5e17f72be49e3");

		$.ajax({
			url: ourRequest

		})


});


//Pull restaurants from spesified zipcode

//create var that calls which objects are needed. (Name, Cuisines, Price Range, Currency, EXT)
*/