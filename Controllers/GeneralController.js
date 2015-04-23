(function(){
	
angular.module("ratepeep")
	.controller("GeneralController", ["$scope","$routeParams","$http","fixerservice","FixerServiceDetails",
		function($scope,$routeParams,$http,fixerservice,FixerServiceDetails){

			var symbolList = {
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
			    'VND': '₫' // Vietnamese Dong
			}

			
			// Passing selected currencies from URL
			$scope.baseCurr = $routeParams.fromCurrency.toUpperCase();
			$scope.convCurr = $routeParams.toCurrency.toUpperCase();
			$scope.baseCurrSymbol = symbolList[$scope.baseCurr];
			$scope.convCurrSymbol = symbolList[$scope.convCurr];


			// Getting Converted Base currency
			fixerservice.getConversion($scope.baseCurr,$scope.convCurr)
				.then(
					function(data){ 	
						$scope.fromToRate = data.rates[$scope.convCurr];	
						$scope.date = data.date;
					  });		

			// Reverse currency conversion
			fixerservice.getConversion($scope.convCurr,$scope.baseCurr)
				.then(
					function(data){ 	
						$scope.toFromRate = data.rates[$scope.baseCurr];	
						$scope.date = data.date;
					  });	

			$scope.isNumber= function (n) {
      			return !isNaN(parseFloat(n));
    		}
	}]);
}());