/**
 * Created by Amulet on 10/3/2015.
 */
  app.controller("uploadController",function($scope,$q,$cordovaCamera, $ionicLoading,Camera){

  //upload section
  $scope.model = "";
  $scope.clickedValueModel = "";
  $scope.removedValueModel = "";

  $scope.getTestItems = function (query) {
    if (query) {
      return {
        items: [
          {id: "1", name: query + "1", view: "view: " + query + "1"},
          {id: "2", name: query + "2", view: "view: " + query + "2"},
          {id: "3", name: query + "3", view: "view: " + query + "3"}]
      };
    }
    return {items: []};
  };

  $scope.itemsClicked = function (callback) {
    $scope.clickedValueModel = callback;
  };
  $scope.itemsRemoved = function (callback) {
    $scope.removedValueModel = callback;
  };

    //camera
    $scope.data = { "ImageURI" :  "Select Image" };
    $scope.test=function(){

      alert("hello");
    }
    $scope.takePicture = function() {
      var q = $q.defer();

      navigator.camera.getPicture(function (result) {
        // Do any magic you need
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    }

    $scope.selectPicture = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      };

      $cordovaCamera.getPicture(options).then(
        function(imageURI) {
          window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
            $scope.picData = fileEntry.nativeURL;
            $scope.ftLoad = true;
            var image = document.getElementById('myImage');
            image.src = fileEntry.nativeURL;
          });
          $ionicLoading.show({template: 'Foto acquisita...', duration:500});
        },
        function(err){
          $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        })
    };

    $scope.uploadPicture = function() {
      $ionicLoading.show({template: 'Sto inviando la foto...'});
      var fileURL = $scope.picData;
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = true;

      var params = {};
      params.value1 = "someparams";
      params.value2 = "otherparams";

      options.params = params;

      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
        $ionicLoading.hide();}, options);
    }

    var viewUploadedPictures = function() {
      $ionicLoading.show({template: 'Sto cercando le tue foto...'});
      server = "http://www.yourdomain.com/upload.php";
      if (server) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
          if(xmlhttp.readyState === 4){
            if (xmlhttp.status === 200) {
              document.getElementById('server_images').innerHTML = xmlhttp.responseText;
            }
            else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
              return false;
            }
          }
        };
        xmlhttp.open("GET", server , true);
        xmlhttp.send()}	;
      $ionicLoading.hide();
    }

    $scope.viewPictures = function() {
      $ionicLoading.show({template: 'Sto cercando le tue foto...'});
      server = "http://www.yourdomain.com/upload.php";
      if (server) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
          if(xmlhttp.readyState === 4){
            if (xmlhttp.status === 200) {
              document.getElementById('server_images').innerHTML = xmlhttp.responseText;
            }
            else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
              return false;
            }
          }
        };
        xmlhttp.open("GET", server , true);
        xmlhttp.send()}	;
      $ionicLoading.hide();
    }
$scope.upload=function(){


}
    $scope.getPhoto = function() {
      console.log('Getting camera');
      Camera.getPicture({
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      }).then(function (imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function (err) {
        console.err(err);
      });
    }


    $scope.FileUpload = function () {
      var url = "http://example.gajotres.net/upload/upload.php";

//File for Upload
      var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";

// File name only
      var filename = targetPath.split("/").pop();

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpg",
        params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
        console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
        console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
        // PROGRESS HANDLING GOES HERE
      });
    }



  });
