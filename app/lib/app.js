var labbApp = angular.module('labbApp', ['ngRoute', 'ngMessages']);

labbApp.config(function ($routeProvider) {
    $routeProvider.when('/partial', {
        controller: 'partialController',
        templateUrl: 'app/lib/partial.html'

    }).when('/partial2', {
        controller: 'partialTwoController',
        templateUrl: 'app/lib/partial2.html'
    });

});

labbApp.run(['$rootScope', function ($rootScope) {
    $rootScope.yourAge;
    $rootScope.userYear = 0;
    $rootScope.userMonth = 0;
    $rootScope.userDay = 0;
    $rootScope.date = new Date();
    $rootScope.currentMonth = (Number($rootScope.date.getMonth() + 1));
    $rootScope.currentDate = Number($rootScope.date.getDate());
    $rootScope.currentYear = Number($rootScope.date.getFullYear());

}]);

labbApp.controller('partialController', ['$scope', function ($scope) {
    $scope.hello = {
        name: 'Simon'
    }
}]);

labbApp.filter('simon', function () {
    return function (input, search) {
        return input.filter(function (value) {
            return value.name.startsWith(search);
        });
    };

});

labbApp.controller('partialTwoController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.$watch('user.ssn', isInputCorrect);

    function isInputCorrect(newValue) {
        if (/\d{8}-\d{4}$/.test(newValue)) {
            if (isSsnValid(newValue)) {
                $scope.showMyErrorMessage = false;
                //Ssn, is now valid
            } else {
                $scope.errorMsg = "Your control number isn't valid";
                $scope.showMyErrorMessage = true;

            }
        } else {
            $scope.errorMsg = "Not a valid ssn";
            $scope.showMyErrorMessage = true;

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
        return (securityNumber == ssn.charAt(12));
    };

    $scope.calculateAge = function calculateAge(ssn) {

        if (ssn != undefined) {
            $scope.sliceUpSsn(ssn);
            $rootScope.yourAge = $rootScope.currentYear - $rootScope.userYear;

            if ($rootScope.currentMonth < $rootScope.userMonth) {
                $rootScope.yourAge--;

            } else if ($rootScope.currentMonth == $rootScope.userMonth && $rootScope.currentDate > $rootScope.userDay) {
                $rootScope.yourAge--;
            }
            return $rootScope.yourAge;
        }

    };

    $scope.sliceUpSsn = function sliceUpSsn(ssn) {
        $rootScope.userYear = Number(ssn.slice(0, 4));
        $rootScope.userMonth = Number(ssn.slice(4, 6));
        $rootScope.userDay = Number(ssn.slice(6, 8));

    };

    $scope.showUserData = function showUserData() {
        $scope.showUser = true;
    }

}]);


