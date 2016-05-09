var app = angular.module('myApp', ['ionic','ion-autocomplete','ngCordova']);

app.config(function($stateProvider, $urlRouterProvider,$compileProvider) {
  $stateProvider
    .state('welcome', {
      url: "/welcome",
      templateUrl: "templates/welcome.html",
      controller: 'welcomeCtrl'
    })
    .state('dashboard', {
      url: "/",
      templateUrl: "home.html",
      controller:'HomeCtrl'

    })
    .state('Account', {
      url: "/Account",
      templateUrl: "templates/Account.html",
      controller:'welcomeCtrl'

    })
    .state("Engg",{
      url:"/Engg",
      templateUrl:"tab/Engineering.html",
      controller:"HomeCtrl"

    })
  // default route
/*
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })*/
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'

    }).
    state('upload',{
    url:'/Upload',
    templateUrl:'templates/upload.html',
      controller:"uploadController"

  }).state('browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('logout', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  //$urlRouterProvider.otherwise("/welcome");
  $urlRouterProvider.otherwise('/');

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

});

app.factory('Books', function($http) {
  var cachedData;

  function getData(bookName, callback) {

    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(bookName),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';

    $http.get(url + mode + key + name).success(function(data) {

      cachedData = data.results;
      callback(data.results);
    });
  }

  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };

});

app.run(function ($rootScope, $state) {
  // Check login session
  $rootScope.$on('$stateChangeStart', function (event, next, current) {
    var userInfo = []//$cookieStore.get('userInfo');
    /*if (!userInfo) {
      // user not logged in | redirect to login
      if (next.name !== "welcome") {
        // not going to #welcome, we should redirect now
        event.preventDefault();
        $state.go('welcome');
      }
    } else if (next.name === "welcome") {
      event.preventDefault();
      $state.go('dashboard');
    }*/
  });
});

app.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])


