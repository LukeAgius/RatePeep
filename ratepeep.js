(function(){ 
	
	// Init Angular App
	var app = angular.module("ratepeep", ["ngRoute"]);

	// Angular Routing
	app.config(function($routeProvider){
		$routeProvider
			.when('/:fromCurrency/:toCurrency',{
				templateUrl : 'Views/RatePeeper.html',
				controller 	: "GeneralController"
			})
	});

	// Angular Controller
	app.controller("GeneralController", ["$scope","$routeParams","$http",
		function($scope,$routeParams,$http){

			var getCurrencySymbol = {
				'USD': '$', // US Dollar
				'NZD': '$', // NZ Dollar
			    'EUR': '€', // Euro
			    'CRC': '₡', // Costa Rican Colón
			    'GBP': '£', // British Pound Sterling
			    'ILS': '₪', // Israeli New Sheqel
			    'INR': '₹', // Indian Rupee
			    'JPY': '¥', // Japanese Yen
			    'KRW': '₩', // South Korean Won
			    'NGN': '₦', // Nigerian Naira
			    'PHP': '₱', // Philippine Peso
			    'PLN': 'zł', // Polish Zloty
			    'PYG': '₲', // Paraguayan Guarani
			    'THB': '฿', // Thai Baht
			    'UAH': '₴', // Ukrainian Hryvnia
			    'VND': '₫', // Vietnamese Dong
			}

			// Passing selected currencies from URL
			$scope.baseCurr = $routeParams.fromCurrency.toUpperCase();
			$scope.convCurr = $routeParams.toCurrency.toUpperCase();
			$scope.baseCurrSymbol = getCurrencySymbol[$routeParams.fromCurrency.toUpperCase()];
			$scope.convCurrSymbol = getCurrencySymbol[$routeParams.toCurrency.toUpperCase()];

			// Getting fromCurrency as base					  
			$http.get("http://api.fixer.io/latest?base="+$scope.baseCurr+"&symbols="+$scope.convCurr)
				.then(function(response){
					$scope.fromToRate = response.data.rates[$scope.convCurr];	
					$scope.date = response.data.date;
				});

			// Getting fromCurrency as base					  
			$http.get("http://api.fixer.io/latest?base="+$scope.convCurr+"&symbols="+$scope.baseCurr)
				.then(function(response){
					$scope.toFromRate = response.data.rates[$scope.baseCurr];	
					$scope.date = response.data.date;
				});
		}]);
}());