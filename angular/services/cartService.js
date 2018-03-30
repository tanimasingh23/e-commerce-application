// using factory method

// Factory method uses the returned value of the function,
// it returns the values
//of the function returned after the execution
// 

myApp.service('cartService', ['$http','$sessionStorage', function($http, $sessionStorage){
	
	var baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/cart/' ;
	var main = this ;
	var products ;

	this.addToCart = function(data){
		return $http({ 
			method : 'POST', 
			url : baseUrl + 'add', 
			params : data
		});
	} // end addToCart

	this.viewCart = function(token){
		return $http({ 
			method : 'GET', 
			url : baseUrl + 'view', 
			params : token
		});
	} // end viewCart

	this.deleteItem = function(data){
		return $http({ 
			method : 'POST', 
			url : baseUrl + 'remove', 
			params : data
		});
	} // end deleteItem

	this.reduceItem = function(data){
		return $http({ 
			method : 'POST', 
			url : baseUrl + 'reduceItem', 
			params : data
		});
	} // end reduceItem

	this.clearCart = function(token){
		return $http({ 
			method : 'GET', 
			url : baseUrl + 'clear', 
			params : token 
		});
	} // end clearCart

	this.getAllItemDetails = function(data){
		main.allItems = data ;
		console.log(data);
	}; // end getAllItemDetails


	this.showItems = function(data){		
		products = [];
		angular.forEach(data, function(prod1, index1){			
			angular.forEach(main.allItems, function(prod2, index2){				
				if( prod1.productId === prod2.productId){
					prod2.quantity = prod1.quantity ;
					prod2.addedOn = prod1.addedOn ;
					products.push(prod2);
				}
			}); 
		}); 
		return products ;
	};

}]); // end of cartService