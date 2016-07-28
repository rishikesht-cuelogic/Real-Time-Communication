hrms.factory('services', function ($resource) {
    function getLeaves() {

    }
    var User = $resource('http://localhost:62643/api/login/login');
    var user = User.save({ username: 'abc', password: 'password' }, function (data) {
        alert(data);
        console.log(data);
    });
    
    var Service = {
        getLeaves: getLeaves
    };
    return Service;
});