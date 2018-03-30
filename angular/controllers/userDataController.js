myApp.controller('userDataController', ['$rootScope','$sessionStorage','$route','userService','$location', function($rootScope , $sessionStorage, $route, userService, $location){	

	var authToken = $sessionStorage.storedAuthToken;
	var main = this ;

	// function load the data of user
	this.loadUserData = function(){
		main.data = userService.getStoredUserData();
		console.log("User Details:", main.data);

		if(!main.data){
			var data = { authToken : authToken };
			userService.getData(data)
			.then(function successCallback(response){
				console.log("User Details: ", response);
				main.data = response.data.data ;
				console.log(response);
			}, function errorCallback(response){
				alert("Some error occured! Please check console.");
				console.log(response);
			});		
		}
	}(); // end of loadUserData

	// function to change user's password
	this.changePassword = function(){
		var data = {
			authToken : authToken,
			oldPassword : main.oldpassword,
			newPassword : main.newpassword
		}
		userService.passwordReset(data)
		.then(function successCallback(response){
			console.log("Password changed", response);
			if(!response.data.error){
			alert("Password changed successfully");
			$route.reload();
			}
			else{
				alert(response.data.message);			
			}
		}, function errorCallback(response){
			alert("Some error occured! Please check console.");
			console.log(response);
		});
	}; // end of changePassword

	// function to show password change form
	this.showPasswordForm = function(){
    	main.showForm = true ;
  	}; // end of showPasswordForm function
	
}]); // end of userDataController