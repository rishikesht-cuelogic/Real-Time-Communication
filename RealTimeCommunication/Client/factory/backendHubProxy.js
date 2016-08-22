'use strict';

hrms.factory('backendHubProxy', ['$rootScope', 'backendServerUrl','backendHubName',
function ($rootScope, backendServerUrl,backendHubName) {

      function backendFactory() {
          var connection = $.hubConnection(backendServerUrl);
          var proxy = connection.createHubProxy(backendHubName);
        
          proxy.on('', function (result) { });//Dummy link because If you don't register any event handlers before calling the start method, you will be able to invoke methods on the Hub, but the Hub's OnConnected method won't be called and no client methods will be invoked from the server

          connection.start().done(function () { });

          return {
              on: function (eventName, callback) {
                  proxy.on(eventName, function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              },
              invoke: function (methodName,data, callback) {
                  proxy.invoke(methodName,data)
                  .done(function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              }
          };
      };

      return backendFactory;
  }]);