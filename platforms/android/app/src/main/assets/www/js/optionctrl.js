myApp.controller("OptionCtrl", function ($scope,$state,$rootScope,$ionicHistory, $ionicModal,$ionicPlatform)
 {
    // $ionicHistory.goBack('-2');
    // navigator.app.exitApp();
    
    console.log($rootScope.viewHistory,$ionicHistory,$rootScope.$viewHistory)
    $scope.currency=localStorage.getItem('currency');
    if(!$scope.currency){
        localStorage.setItem('currency',"EUR");
        $scope.currency=localStorage.getItem('currency');
    }
    console.log($scope.currency)
       
    // $ionicPlatform.registerBackButtonAction(function (event) {
    //     if(true){
    //       navigator.app.exitApp();
    //       console.log("insde back button")
    //     }
    //     else {
    //       navigator.app.backHistory();
    //     }
    //   }, 100);

    $ionicPlatform.registerBackButtonAction(function (e) {
  
        console.log('back button clicked from option')
        navigator.app.backHistory();
      },102)
})
