myApp.controller("aboutCtrl", function ($scope, $ionicModal, $state, $ionicPlatform) {

  $scope.currentYear = new Date().getFullYear();

  $ionicPlatform.registerBackButtonAction(function (e) {

    console.log('back button clicked from search')
    navigator.app.backHistory();
  }, 102)
})
