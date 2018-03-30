// using factory method

// Factory method uses the returned value of the function,
// it returns the values
//of the function returned after the execution
// 
myApp.service('userService', ['$http', function($http){

	var baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/user/';
	var main= this ;

	this.login = function (data) {
		
		return $http ({ 
			method : 'POST', 
			url : baseUrl + '/login' , 
			params : data  
		});
	} // end login

	this.signup = function (data) {
		
		return $http ({ 
			method : 'POST', 
			url : baseUrl + '/signup', 
			params : data 
		});
	} // end signup

	this.getData = function(data){

		return $http({ 
			method : 'GET', 
			url : baseUrl + 'myaccount', 
			params : data 
		});
	} //end getData

	this.passwordReset = function(data){

		return $http({ 
			method : 'POST', 
			url : baseUrl + 'changepassword', 
			params : data 
		});	
	} //end passwordReset

	this.logout = function(data){

		return $http({ 
			method : 'POST', 
			url : baseUrl + 'logout', 
			params : data 
		});
	} //end logout
	
	this.storeUserData = function(data){
		main.userData = data.data ;
	} //end storeUserData

	this.getStoredUserData = function(){
		return main.userData ;
	} //end getStoredUserData

}]); // end of userService