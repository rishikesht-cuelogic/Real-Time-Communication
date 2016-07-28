hrms.controller('loginController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.user = {
        username: '',
        password:''
    };
    $scope.unauthorisedMessage='Invalid username and password';
    $scope.unauthorised=false;

    //hub.server.initialise('Admin');
    $scope.login = function () {
        


        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/Account/login',
            data:$scope.user
        }).then(function successCallback(response) {
            if (response.data.IsValid)
            {
                hub.server.initialise(response.data.UserId);
                localStorage.setItem('UserId', response.data.UserId);

                if (response.data.Role == "Manager")
                    $state.go('leaveRequest');
                else
                    $state.go('leaves');
            }                
            else
                $scope.unauthorised = true;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    
}]);