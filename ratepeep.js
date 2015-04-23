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
			.when('/:baseCurrency',{
				templateUrl : 'Views/RatesList.html',
				controller 	: "GeneralController"
			})
	});


	app.constant('FixerServiceDetails',{
		url 				: "http://api.fixer.io/latest?"
	});
}());