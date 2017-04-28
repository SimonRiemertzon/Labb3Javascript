var labbApp = angular.module('labbApp', []);

labbApp.controller('labbController', ['$scope', function ($scope) {

    $scope.ninjas = [
        {
            name: 'Yoshi',
            belt: 'Green'
        },
        {
            name: 'Crystal',
            belt: 'Yellow'
        },
        {
            name: 'Ryu',
            belt: 'Orange'
        },
        {
            name: 'Shaun',
            belt: 'Black'
        }
    ]

}]);



labbApp.filter ('simon', function() {
    return function (input, search) {
        return input.filter(function (value) { return value.name.startsWith(search); });
    };

});


