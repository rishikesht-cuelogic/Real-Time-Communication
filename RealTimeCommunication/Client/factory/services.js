hrms.factory('service', ['$q', '$http', function ($q, $http) {
    var baseUrl = 'http://localhost:62643/api/'
    function getLeaves() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl+'leave/get?userid=' + localStorage.getItem('UserId'),
        }).then(function successCallback(response) {
            deferred.resolve(response.data)
        }, function errorCallback(response) {
        });
        return deferred.promise;    
    }
    function getAllLeaves() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl+'leave/getall',
        }).then(function successCallback(response) {
            deferred.resolve(response.data)
        }, function errorCallback(response) {
        });
        return deferred.promise;
    };

    function leaveAction(leaveId,status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: baseUrl+'leave/action',
            data: { LeaveId: leaveId, Status: status }
        }).then(function successCallback(response) {
            if (response.data) {
                
                deferred.resolve(response.data);
            }

        }, function errorCallback(response) {
        });
        return deferred.promise;
    }

    function leaveRequest(data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: baseUrl + 'leave/LeaveRequest',
            data: data
        }).then(function successCallback(response) {
            if (response.data) {
                deferred.resolve(response.data);
            }
        }, function errorCallback(response) {
        });
        return deferred.promise;
    }

    var Service = {
        getLeaves: getLeaves,
        getAllLeaves: getAllLeaves,
        leaveAction: leaveAction,
        leaveRequest: leaveRequest
    };
    return Service;
}]);