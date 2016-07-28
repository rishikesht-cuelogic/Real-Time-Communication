hrms.controller('loginController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.user = {
        username: '',
        password:''
    };
    $scope.unauthorisedMessage='Invalid username and password';
    $scope.unauthorised=false;

    //var hub = $.connection.signalRHub;
    //// Create a function that the hub can call to broadcast messages.
    //hub.client.broadcastMessage = function (data) {
    //    alert('Login:' + data);
    //};
    //$.connection.hub.url = 'http://localhost:62643/signalr';
    //$.connection.hub.start().done(function () { });



    $scope.login = function () {
        


        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/Account/login',
            data:$scope.user
        }).then(function successCallback(response) {
            if (response.data.IsValid)
            {
                //hub.server.initialise(response.data.UserId);
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