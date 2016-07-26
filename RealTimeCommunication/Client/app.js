var hrms = angular.module('hrms', ['ui.router']);

hrms.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/leaves');

    $stateProvider
    .state('leaveRequest', {
        url: '/leaveRequest',
        templateUrl: 'html/leaveRequest.html'
    })
    .state('leaves', {
        url: '/leaves',
        templateUrl: 'html/leaves.html'
    })
}]);


