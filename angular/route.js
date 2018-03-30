myApp.config(['$routeProvider',function($routeProvider) {
	
	$routeProvider
		.when('/' , {

			templateUrl 	: 'views/product-view.html',
			controller 		: 'productController',
			controllerAs 	: 'product'
		})
		.when('/signup',{

			templateUrl 	: 'views/signup-view.html',
			controller 		: 'signupController',
			controllerAs 	: 'signup'
		})
		.when('/login',{

			templateUrl 	: 'views/login-view.html',
			controller 		: 'loginController',
			controllerAs 	: 'login'
		})
		.when('/userData',{

			templateUrl 	: 'views/user-details-view.html',
			controller 		: 'userDataController',
			controllerAs 	: 'user'
		})
		.when('/cart',{

			templateUrl 	: 'views/cart-view.html',
			controller 		: 'cartController',
			controllerAs 	: 'cart'
		})
		.when('/orderdetails',{

			templateUrl 	: 'views/order-details-view.html',
			controller 		: 'orderController',
			controllerAs 	: 'order'
		})
		.when('/error',{

            template   : '<h1>Some error occured while connecting to backend!</h1>'

        })
		.otherwise(
            {
            	template   : '<h1>404 page not found</h1>'
            }
        );
}]);

