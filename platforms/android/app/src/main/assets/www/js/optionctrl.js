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
})
