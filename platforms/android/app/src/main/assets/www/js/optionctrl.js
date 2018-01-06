myApp.controller("OptionCtrl", function ($scope, $ionicModal)
 {
    $scope.currency=localStorage.getItem('currency');
    if(!$scope.currency){
        localStorage.setItem('currency',"EUR");
        $scope.currency=localStorage.getItem('currency');
    }
    console.log($scope.currency)


})
