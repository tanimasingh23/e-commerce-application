myApp.controller('productController', ['productService','cartService', function(productService, cartService){
	
	var main =this ;

	this.showAllProducts = true ;
	this.showByCategory = false ;

	// function to get all the categories of products
	this.getCategories = function(){

		productService.viewAllCategory()
		.then(function successCallback(response){
			console.log(response);
			main.categories = response.data.data ;
		}, function errorCallback(response){
			alert("Some error occured! Please check console.");
			console.log(response);
		});
	}(); // end of getCategories function

	// function to get all the products
	this.getAllProducts = function(){
		this.showAllProducts = true ;
		this.showByCategory = false ;

		productService.viewAllProducts()
		.then(function successCallback(response){
			console.log(response);
			main.allProducts = response.data.data ;
			cartService.getAllItemDetails(response.data.data);
		} , function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");
		});
	}; // end of getAllProducts

	// function to get products based on their category
	this.getProductByCategory = function (category) {
		this.showAllProducts = false ;
		this.showByCategory = true ;
		
		productService.viewProductsByCategory(category)
		.then(function successCallback(response){
			console.log(response);
			main.productByCategory = response.data.data ;
		} , function errorCallback(response){
			console.log(response);
			alert("Some error occured! Please check console.");
		});

	};// end of getProductByCategory function

}]) ; // end of productController