myApp.controller('cartController', ['$location', '$rootScope','cartService','$sessionStorage','productService','$route','orderService', function($location, $rootScope, cartService,$sessionStorage, productService, $route, orderService){
	
	var main = this ;
	this.itemsInCart = [] ;

	// function to view cart
	this.viewUserCart = function(){
		var token = { 
			authToken : $sessionStorage.storedAuthToken 
		}; 
		cartService.viewCart(token)
		.then(function successCallback(response){
			main.cartData = response.data.data.cartInfo ;
			console.log(main.cartData);
			$sessionStorage.cartLength = main.cartData.length;
			main.itemsInCart = cartService.showItems(main.cartData);
			if(main.itemsInCart == undefined || main.itemsInCart.length === 0)
			main.viewAllProducts();
		},function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");
		});
	}(); // end of viewUserCart

	// function to view all products
	this.viewAllProducts = function(){
		productService.viewAllProducts()
		.then(function successCallback(response){
			console.log(response);
			main.allProducts = response.data.data ;
			cartService.getAllItemDetails(response.data.data);
			main.itemsInCart = cartService.showItems(main.cartData);
		} , function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");
		});
	}; // end of viewAllProducts

	// function to place order from cart
	this.orderFromCart = function(){
		var token = {
			authToken : $sessionStorage.storedAuthToken
		};
		orderService.orderFromCart(token)
		.then(function successCallback(response){
			console.log(response);
			if(!response.data.error){
				alert("Order placed successfully!");
				orderService.saveOrderDetails(response.data.data);
				$location.path('/orderdetails');
			}	
			else {
				$sessionStorage.$reset();
				alert("Please login to continue.");
				$rootScope.isloggedIn = false ;
				$location.path('/login');
			}
		}, function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");	
		});
	}; // end of orderFromCart

	// function to remove item from cart
	this.removeItemFromCart = function(productId, index){
		var data = {
			authToken 	: $sessionStorage.storedAuthToken ,
			productId	: productId
		};
		cartService.deleteItem(data)
		.then(function successCallback(response){
			console.log(response);	
			if(!response.data.error){
				alert("Item removed from bag!");
				$sessionStorage.cartLength = $sessionStorage.cartLength-1 ;
				main.itemsInCart.splice(index,1);
				$route.reload();
			}
			else{
				alert("Some error occured! Please check console.");
			}						
		},function errorCallback(response){
				console.log(response);
				alert("Some error occured! Please check console.");
		});	 
	}; // end of removeItemFromCart

	// function to delete all the items from cart
	this.clearMyCart = function(){
		var token ={
			authToken : $sessionStorage.storedAuthToken
		};
		cartService.clearCart(token)
		.then(function successCallback(response){
			console.log(response);
			if(!response.data.error){
				alert("Bag cleared!");
				main.itemsInCart.splice(0);
				$sessionStorage.cartLength = '';
				$route.reload();
			}
			else{
				alert("Some error occured! Please check console.");	
			}
		},function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");			
		});
	};	// end of clearMyCart
	
	// function to reduce the quantity of an item from cart
	this.reduceItemFromCart = function(productId, qty){

		var data = {
			authToken 	: $sessionStorage.storedAuthToken ,
			productId	: productId,
			quantity	: qty
		};
		cartService.reduceItem(data)
		.then(function successCallback(response){
			console.log(response);
			if(!response.data.error){
				$route.reload();				
			}
			else{
				alert(response.data.message);	
			}			
		}, function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");
		});
	}; // end of reduceItemFromCart
	
}]); // end of cartController