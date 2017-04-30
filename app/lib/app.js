var labbApp = angular.module('labbApp', ['ngRoute', 'ngMessages']);

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

    function isInputCorrect(newValue) {
        console.log("Nu körs isInputCorrect " + newValue );
        if (/\d{8}-\d{4}$/.test(newValue)) {
            console.log(newValue);
            if (isSsnValid(newValue)) {
                $scope.showMyErrorMessage = false;

            } else {
                $scope.errorMsg = "Your control number isn't valid";
                $scope.showMyErrorMessage = true;

            }
        } else {
            $scope.errorMsg = "Not a valid ssn";
            $scope.showMyErrorMessage = true;

        }

    };


    $scope.$watch('userSsn', isInputCorrect);

/*
****1****
    labbApp.directive('userSsn', function() {
    return {
        restrict: 'A',

        require: 'ngModel',

        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (/\d{8}-\d{4}$/.test(ngModelValue)) {
                    console.log(ngModelValue);
                    ctrl.$setValidity('regexValidator', true);

                    if (isSsnValid(ngModelValue)) {
                        ctrl.$setValidity('securityNumberValidator', true);

                    } else {
                        $scope.errorMsg = "Kontrollsiffran är fel";
                        ctrl.$setValidity('securityNumberValidator', false);
                    }
                } else {
                    $scope.errorMsg = "Du angav ej ett korrekt personnummer. Försök igen!";
                    ctrl.$setValidity('regexValidator', false);


                }

                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
});

/*
    $scope.isInputCorrect = function isInputCorrect(ssn) {
        if (/\d{8}-\d{4}$/.test(ssn)) {
            console.log(ssn);
            if (isSsnValid(ssn)) {

            } else {
                $scope.errorMsg = "Kontrollsiffran är fel";

            }
        } else {
            $scope.errorMsg = "Du angav ej ett korrekt personnummer. Försök igen!";



        }
    };


*/




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
        return (securityNumber == ssn.charAt(12));
    };


    $scope.calculateAge = function calculateAge(ssn) {
        sliceUpSsn(ssn, true);
        yourAge = currentYear - userYear;

        if (currentMonth < userMonth) {
            yourAge--;

        } else if (currentMonth == userMonth && currentDate > userDay) {
            yourAge--;
        }
        return yourAge;
    };


    $scope.sliceUpSsn = function sliceUpSsn(ssn) {

        userYear = Number(ssn.slice(0, 4));
        userMonth = Number(ssn.slice(4, 6));
        userDay = Number(ssn.slice(6, 8));

    }



}]);


