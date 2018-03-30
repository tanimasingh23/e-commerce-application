myApp.controller('orderController', ['orderService','$sessionStorage', function(orderService, $sessionStorage){
	
	var main = this ;

	// function to load details after placing the order
	this.loadOrderDetails = function(){
		main.data = orderService.getOrderDetails();
		$sessionStorage.cartLength = 0 ;
		console.log(main.data);
	}(); // end of loadOrderDetails

}]); // end of orderController