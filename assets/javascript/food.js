		//BARZZ api page = https://www.programmableweb.com/api/barzz
		//BARZZ documentation = https://barzz.3scale.net/docs
		
		function displayBarzzInfor(){

		var barzz = $(this).attr("data-name");
		var queryURL = "http://echo-api.3scale.net/?user_key=dbd687c7ace8bf9a4dce0971129d8320" + barzz;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(respone){


		})

		}
		

