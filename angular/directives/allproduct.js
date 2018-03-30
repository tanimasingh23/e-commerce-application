myApp.directive('allproductCard',function(){
	
	return{
		restrict : 'E',
		templateUrl : './views/allproduct-card.html',
		scope : {
			prod :'='
			},

		controller :  function($scope, cartService, $sessionStorage, orderService, $rootScope,$route, $location){

			// function to add item to cart
			$scope.addToCart = function(id , qty){
				var data = {
					productId 	: id,
					quantity	: qty,
					authToken	: $sessionStorage.storedAuthToken 
				}
				cartService.addToCart(data)
				.then(function successCallback(response){
					console.log(response);
					if(!response.data.error){
						alert("Item added to bag!");
						$sessionStorage.cartLength = $sessionStorage.cartLength+1 ;
						$rootScope.isloggedIn = true ;
						$location.path('/');
						$route.reload();
					}
					else {
						alert("Please login to continue.");
						$sessionStorage.$reset();
						$rootScope.isloggedIn = false ;
						$location.path('/login');
					}
				},function errorCallback(response){
					console.log(response);
				});
			} // end of addToCart function

			// function to place order from product view
			$scope.orderNow = function(id, qty){			
				var data = {
					productId 	: id,
					quantity	: qty,
					authToken	: $sessionStorage.storedAuthToken 
				}
				orderService.orderFromProductView(data)
				.then(function successCallback(response){
					console.log("Order placed:",response);					
					if(!response.data.error){
						alert("Order placed successfully!");
						orderService.saveOrderDetails(response.data.data) ;
						$rootScope.isloggedIn = true ;
						$location.path('/orderdetails');
					}
					else{
						alert("Please login to continue.");
						$sessionStorage.$reset();
						$rootScope.isloggedIn = false ;						
						$location.path('/login');
					}
				},function errorCallback(response){
					console.log(response);
				});				
			} //end of orderNow function			
		} // end of controller
		
	} // end of return
}); // end of directive