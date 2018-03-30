// using factory method

// Factory method uses the returned value of the function,
// it returns the values
//of the function returned after the execution
// 

myApp.service('orderService', ['$http', function($http){

	var baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/order/' ;
	var main = this;
	
	this.orderFromCart = function(token){
		return $http({ 
			method : 'POST', 
			url    : baseUrl + '/fromCart', 
			params : token 
		});
	} //end orderFromCart

	this.orderFromProductView = function (data) {
		return $http({ 
			method : 'POST', 
			url    : baseUrl + '/create', 
			params : data
		});
	} // end orderFromProductView

	this.saveOrderDetails = function(data){
		main.orderData = data ;

	}; // end saveOrderDetails

	this.getOrderDetails = function(){
		return (main.orderData) ;
		
	}; // end getOrderDetails

}]); // end of orderService