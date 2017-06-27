		//BARZZ api page = https://www.programmableweb.com/api/barzz
		//BARZZ documentation = https://barzz.3scale.net/docs
		//=====================================================================================================

		//function to diplay the appropriate content
		function displayBarzzInfor(){

		var barzz = $(this).attr("data-name");
		var queryURL = "http://echo-api.3scale.net/?user_key=dbd687c7ace8bf9a4dce0971129d8320" + barzz;

		// Create an AJAX for the specific bar that is being clicked by the user
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(respone){

		})

		}
		

