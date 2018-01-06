myApp.controller("OptionCtrl", function ($scope, $ionicModal,$ionicPlatform)
 {
    $scope.currency=localStorage.getItem('currency');
    if(!$scope.currency){
        localStorage.setItem('currency',"EUR");
        $scope.currency=localStorage.getItem('currency');
    }
    console.log($scope.currency)
   
    $ionicPlatform.registerBackButtonAction(function (event) {
        if(true){
          navigator.app.exitApp();
          console.log()
        }
        else {
          navigator.app.backHistory();
        }
      }, 100);
})
