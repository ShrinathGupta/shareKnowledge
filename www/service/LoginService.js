app.service('LoginService', function (appHTTPService) {
    this.LoginUser = function (user) {
        var params = {  password: user.password,username: user.username };
        return appHTTPService.post("", {});
    };
});

