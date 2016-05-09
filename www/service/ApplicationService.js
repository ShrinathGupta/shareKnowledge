app.service('AppService', function (appHTTPService) {

    this.getCollege = function (area) {
         return appHTTPService.get("GetCollege", {  });
    }
    this.getSubject = function (collegeid) {
        return appHTTPService.postjson("GetSubject", { id: collegeid });
    }
  this.sendmail_document=function(modal){

    return appHTTPService.sendmail("sendmail",{mailModel:modal});
  }

    });
