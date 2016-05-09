/**
 * Created by Amulet on 9/30/2015.
 */
app.controller('welcomeCtrl', function ($scope, $state,$http) {

  /**
   *  LOGIN
   *  Google +
   */


  // Google Plus Login
  $scope.gplusLogin = function () {
    var myParams = {
      // Replace client id with yours
      'clientid': '365137351650-eob4fkrcoasp4pih5rsafltg8uc1t4li.apps.googleusercontent.com',
      'cookiepolicy': 'single_host_origin',
      'callback': loginCallback,
      'approvalprompt': 'force',
      'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);

    function loginCallback(result) {
      console.log("result",result);
      if (result['status']['signed_in']) {

       var request =$http({
         url: 'https://www.googleapis.com/oauth2/v3/userinfo',
         method: 'GET',
         params: {
           access_token: result.access_token
         }
       });
        request.then(function (data) {
          //$log.debug(data);
          var user_data = data.data;
          var user = {
            name: user_data.name,
            gender: user_data.gender,
            email: user_data.email,
            google_id: user_data.sub,
            picture: user_data.picture,
            profile: user_data.profile
          };
          console.log("result",user);
          $scope.user=user;
          //def.resolve(user);
        });
        $state.go('dashboard');
        // var data=gapi.client.plus.get({access_token: result.access_token});
        //console.log("result",request);

        /* request.execute(function (resp) {
          console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
          var userEmail;
          if (resp['emails']) {
            for (var i = 0; i < resp['emails'].length; i++) {
              if (resp['emails'][i]['type'] == 'account') {
                userEmail = resp['emails'][i]['value'];
              }
            }
          }
          // store data to DB
          var user = {};
          user.name = resp.displayName;
          user.email = userEmail;
          if(resp.gender) {
            resp.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
          } else {
            user.gender = '';
          }
          user.profilePic = resp.image.url;
          $cookieStore.put('userInfo', user);

          $state.go('dashboard');
        });*/
      }
    }
  };
  // END Google Plus Login

});
