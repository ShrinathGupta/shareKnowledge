app.service('appHTTPService', function ($rootScope, $http) {
    SERVER_URL = "http://localhost:8080/newGenShare.web.com/api/GetData/";
    SERVER_URL_EMAIL="http://localhost:8080/newGenShare.web.com/api/Email";
    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = false;
    delete $http.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";
    this.serverurl = SERVER_URL;
  this.serveremail=SERVER_URL_EMAIL;

    this.get = function (action, params) {
        return $http({
            url: this.serverurl + action,
            method: 'GET',
            //headers: { 'Authorization': 'Bearer ' + $rootScope.rootFields.token },//For Token Authorization
            params: params,

        });
    };
  this.sendmail = function (action, params) {
    return $http({
      url: this.serveremail + action,
      method: 'POST',
      //headers: { 'Authorization': 'Bearer ' + $rootScope.rootFields.token },//For Token Authorization
      params: params,

    });
  };
    this.post = function (action, params) {
        return $http({
            url: this.serverurl + action,
            method: 'POST',
            //headers: { 'Authorization': 'Bearer ' + $rootScope.rootFields.token }, //For Token Authorization
            params: params,
            data: params
        });
    };
    this.postjson = function (action, params) {
        return $http({
            url: this.serverurl + action,
            method: 'POST',
            //headers: {
            //    'Content-Type': 'application/json',
            //    'Authorization': 'Bearer ' + $rootScope.rootFields.token
            //},
            params: params
        });
    };
    this.jsonp = function (action, params) {
        return $http({
            url: this.serverurl + action,
            method: 'JSONP',
           // headers: { 'Authorization': 'Bearer ' + $rootScope.rootFields.token },
            params: params
        });
    };
    this.delete = function (action, params) {
        return $http({
            url: this.serverurl + action,
            method: 'DELETE',
          //  headers: { 'Authorization': 'Bearer ' + $rootScope.rootFields.token },
            params: params
        });
    };
});
