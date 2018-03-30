myApp.controller('loginController', ['userService','$sessionStorage','$location', function(userService, $sessionStorage, $location){

	var main = this ;

	// function for user login
	this.userLogin = function(){

		var userData = {
			email		: main.email,
			password 	: main.password
		};
		userService.login(userData)
		.then(function successCallback(response){
			console.log("Logged in successfully", response);
			if(!response.data.error){
				$sessionStorage.storedAuthToken = response.data.data['auth-token'] ;
				$location.path('/');
			}
			else {
				alert(" The email or password you entered is incorrect!");
			}
		}, function errorCallback(response){
			alert("Some error occured! Please check console.");
			console.log(response);
		});
	}; // end of userLogin function
	
}]); // end of loginController