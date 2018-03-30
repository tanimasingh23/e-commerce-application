myApp.directive('navbarCard',function(){
	
	return{
		restrict : 'E',
		templateUrl : './views/navbar-card.html',
		scope : {} ,
		controller : function($scope, $sessionStorage, userService, $location, $rootScope, $route){

			$scope.cartLength = $sessionStorage.cartLength ;
			// function to load user data
			$scope.loadData = function(){

				data = { 
					authToken : $sessionStorage.storedAuthToken 
				} ;
				userService.getData(data)
				.then(function successCallback(response){
					console.log("User Data:", response);
					$scope.checkStatus(response.data);					
				}, function errorCallback(response){
					alert("Some error occured! Please check console.");
					console.log(response);
				});		
			}; // end of loadData function
			
			// function for logout of user
			$scope.userLogout = function(){

				data = { 
					authToken : $sessionStorage.storedAuthToken 
				} ;
				userService.logout(data)
				.then(function successCallback(response){
					console.log('logout',response);						
					if(!response.data.error){
						alert("Logged Out!");
					}
					else{
						alert("Please login to continue.");
					}
					$sessionStorage.$reset();
					$scope.checkStatus(true);
					$location.path('/');
					$route.reload();
				},function errorCallback(response){
					alert("Some error occured! Please check console.");
					console.log(response);
				}) ;
			}; // end of userLogout function

			// function to check login/logout status of users
			$scope.checkStatus = function(data){
				if(data.error){
					$rootScope.isloggedIn = false ;
					$sessionStorage.$reset();
				}
				else{
					$rootScope.isloggedIn = true ;
					userService.storeUserData(data);
				}
			}; // end of checkStatus
				
		} // end of controller
	} // end of return

}); // end of navbar directive