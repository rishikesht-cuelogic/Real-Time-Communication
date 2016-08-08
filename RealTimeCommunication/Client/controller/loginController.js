hrms.controller('loginController', ['$scope', '$state', 'backendHubProxy', 'service', function ($scope, $state, backendHubProxy, service) {
    var hub = backendHubProxy();
    
    $scope.user = {
        username: '',
        password:''
    };
    $scope.unauthorisedMessage='Invalid username and password';
    $scope.unauthorised=false;
    $scope.login = function () {
        service.login($scope.user).then(function (data) {
                if (data.IsValid)
                {
                    hub.invoke('initialise', data.UserId);
                    localStorage.setItem('UserId', data.UserId);

                    if (data.Role == "Manager")
                        $state.go('leaveRequest');
                    else
                        $state.go('leaves');
                }                
                else
                    $scope.unauthorised = true;
        });
    }
    
}]);