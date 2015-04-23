(function(){

angular.module("ratepeep").
	factory("fixerservice", 
		function($http, FixerServiceDetails){

		// Getting fromCurrency as base					  		
		var getConversion = function(BaseCurrency, ConversionCurrency){
			return $http.get(FixerServiceDetails.url+"base="+BaseCurrency+"&symbols="+ConversionCurrency)
				.then(function(response){
						return response.data;
				});
		};

		// Exposing functions
		return {
			getConversion: getConversion,
		};
	});
}());