var labbApp = angular.module('labbApp', ['ngRoute']);

labbApp.config(function($routeProvider){
    $routeProvider.when('/partial' , {
        controller : 'partialController',
        templateUrl :'app/lib/partial.html'

    }).when('/partial2', {
        controller: 'partialTwoController',
        templateUrl : 'app/lib/partial2.html'
    })



});




labbApp.controller('partialController', ['$scope', function($scope) {
    $scope.hello = {
    name: 'Simon'
    }
}]);

labbApp.filter ('simon', function() {
    return function (input, search) {
        return input.filter(function (value) { return value.name.startsWith(search); });
    };

});

labbApp.controller('partialTwoController', ['$scope', function ($scope) {
/*
    $scope.user ={
        name: "",
        ssn : ""

    };
 */



    $scope.$watch(ssnModel,
        function(newValue, oldValue) {
        if(newValue) {
            console.log("Hello " + newValue);
        }

    });



    $scope.isInputCorrect = function isInputCorrect(ssn) {
        if (/\d{8}-\d{4}$/.test(ssn)) {
            if (isSsnValid(ssn)) {

            } else {
                $scope.errorMsg = "Kontrollsiffran är fel";

            }
        } else {
            $scope.errorMsg = "Du angav ej ett korrekt personnummer. Försök igen!";



        }
    };


    function isSsnValid(ssn) {
        var ssnOnlyNumbers = ssn.replace('-', '');
        var sum = 0;

        for (var i = 2; i < ssnOnlyNumbers.length - 1; i++) {
            if (i % 2 === 0) {
                var currentSum = ssnOnlyNumbers.charAt(i) * 2;
                sum += currentSum;
                if (currentSum > 9) {
                    sum -= 9;
                }
            } else {
                sum += Number(ssnOnlyNumbers.charAt(i));
            }
        }
        var securityNumber = (10 - (sum % 10)) % 10;
        console.log(securityNumber);
        return (securityNumber == ssn.charAt(12));
    }


    function calculateAge(ssn) {
        sliceUpSsn(ssn, true);
        yourAge = currentYear - userYear;

        if (currentMonth < userMonth) {
            yourAge--;

        } else if (currentMonth == userMonth && currentDate > userDay) {
            yourAge--;
        }
        return yourAge;
    }


    function sliceUpSsn(ssn) {

        userYear = Number(ssn.slice(0, 4));
        userMonth = Number(ssn.slice(4, 6));
        userDay = Number(ssn.slice(6, 8));

    }



}]);


