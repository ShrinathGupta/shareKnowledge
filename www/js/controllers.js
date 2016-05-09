

app.controller('HomeCtrl', function($scope,AppService, $ionicSideMenuDelegate,$ionicModal, Books,$state,$ionicPopup,$timeout,$cordovaFileTransfer,$cordovaCamera, $ionicLoading) {

 /* setInterval(function(){
    console.log($ionicSideMenuDelegate.isOpen());
  }, 1000);
*/

  $scope.gplusLogin = function () {
    var myParams = {
      // Replace client id with yours
      'clientid': '18301237550-3vlqoed2en4lvq6uuhh88o2h1l9m70tr.apps.googleusercontent.com',
      'cookiepolicy': 'single_host_origin',
      'callback': loginCallback,
      'approvalprompt': 'force',
      'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);

    function loginCallback(result) {
      if (result['status']['signed_in']) {
        var request = gapi.client.plus.people.get({'userId': 'me'});
        request.execute(function (resp) {
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
        });
      }
    }
  };
  // END Google Plus Login

  //search clicked
  $scope.click_search=function(){

    $state.go('search');
    //$window.location.reload();
  }
  //Logout
  $scope.logout = function () {
  //  $cookieStore.remove("userInfo");
   // $state.go('/welcome');
    //$window.location.reload();
  };
//Account
  $scope.accountdetail = function(){
    $state.go('Account');

  }

  $scope.selected = {
    score : 0,
    bookName : 'Batman'
  }

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.greaterThan = function(fieldName){
    return function(item){
      return item[fieldName] > $scope.selected.score;
    }
  }

  $scope.searchbookName = function() {

    Books.list($scope.selected.bookName, function(Books) {
      $scope.Books = Books;
    });

  };

  $scope.searchbookName();

  $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="email" ng-model="data.email">',
      title: 'Enter Email Address',
      subTitle: 'Please enter friend email address',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Send</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.email) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              //console.log($scope.data);
              return $scope.data.email;
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    /*$timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);*/
  };

  $scope.positivereview=43;
  $scope.negativereview=10;

  $scope.positive=function(){

    $scope.positivereview= $scope.positivereview+1;
  }
  $scope.negative=function(){

    $scope.negativereview=$scope.negativereview-1;
  }

  $scope.download=function() {
// for try download working or not on phone
    var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

// File name only
    var filename = url.split("/").pop();

// Save location
    var targetPath = cordova.file.externalRootDirectory + filename;

    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      console.log('Success');
    }, function (error) {
      console.log('Error');
    }, function (progress) {
      // PROGRESS HANDLING GOES HERE
    });
  }
  $scope.cities =[];
 /* AppService.getCollege("1").success(function (result) {
    $scope.cities = result;
    console.log(result);
  }).error(function (data, status, headers, config) {
    //
  });*/
    /*$scope.$watch('country', function (newVal) {
      if (newVal) {
        AppService.getCollege(newVal).success(function (result) {
          $scope.cities = result;
          console.log(result);
        }).error(function (data, status, headers, config) {
          //
        });

      }
    });
    $scope.$watch('city', function (newVal) {
      console.log("city", newVal);
      if (newVal) {
        AppService.getSubject(newVal.Id).success(function (result) {
          $scope.suburbs = result;
          console.log(result);
        }).error(function (data, status, headers, config) {
          //
        });
      }//$scope.suburbs = ['SOMA', 'Richmond', 'Sunset'];
    });*/
    $scope.countries = ['Pune', 'Bhopal', 'Mumbai', 'Indore'];
    $scope.Exam = ['Bank', 'IIT', 'PMT', 'CPMT', 'MBA'];

 $scope.modal= {
   recipient: "shrinath161@gmail.com",
   subject: "Test",
  body:"Test",
filename:"Test.html"
};
  $scope.FileDownload = function () {
    var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

// File name only
    var filename = url.split("/").pop();

// Save location
    var targetPath = cordova.file.externalRootDirectory + filename;

    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      console.log('Success');
    }, function (error) {
      console.log('Error');
    }, function (progress) {
      // PROGRESS HANDLING GOES HERE
    });
  }
 /* AppService.sendmail_document($scope.modal).success(function(result){
    console.log("result",result);
  })*/

  $scope.showActionsheet=function(){

    $state.go('upload');
  }
});
