myApp.controller('signupController', ['userService','$location', function(userService, $location){
	
	var main = this ;

	// function for user signup
	this.userSignup = function(){

		var userData = {
			firstName	: main.firstName,
			lastName	: main.lastName,
			middleName	: main.middleName,
			email		: main.email,
			address		: main.address,
			mobileNumber: main.mobileNumber,
			password	: main.password
		};

		userService.signup(userData)
		.then(function successCallback(response){
			console.log("User signed up",response);
			if(!response.data.error){
				alert(response.data.message);
				$location.path('/login');
			}
			else{
				alert(response.data.message);			
			}
		}, function errorCallback(response){
			alert("Some error occured! Please check console.");
			console.log(response);
		});

	} // end of userSignup function

}]); // end of signupController