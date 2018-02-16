myApp.controller("aboutCtrl", function ($scope, $ionicModal, $state,$ionicPlatform)
 {
    $ionicPlatform.registerBackButtonAction(function (e) {
  
        console.log('back button clicked from search')
        navigator.app.backHistory();
      },102)
})



