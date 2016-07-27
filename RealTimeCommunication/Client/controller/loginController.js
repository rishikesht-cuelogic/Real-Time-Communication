hrms.controller('loginController', ['$scope', '$state', function ($scope, $state) {
    $scope.user = {
        username: '',
        password:''
    };
    //hub.server.initialise('Admin');
    $scope.login = function () {
        hub.server.initialise($scope.user.username);
        $state.go('leaves');        
    }
    
}]);