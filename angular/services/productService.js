// using factory method

// Factory method uses the returned value of the function,
// it returns the values
//of the function returned after the execution
// 

myApp.service('productService', ['$http', function($http){

	var baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/product/view';

	this.viewAllCategory = function () {
		
		return $http ({ 
			method : 'GET' , 
			url : baseUrl + '/getallcategory'  
		});
	} //end viewAllCategory

	this.viewAllProducts = function () {
		
		return $http ({ 
			method : 'GET' , 
			url : baseUrl + '/all'  
		});
	} //end viewAllProducts

	this.viewProductsByCategory = function (category) {
		
		return $http ({ 
			method : 'GET' , 
			url : baseUrl + '?category='+ category  
		});
	} //end viewProductsByCategory

	
}]); // end of productService