myApp.controller("coinDetailsCtrl", function ($scope, $ionicModal, $state,$stateParams)
 {
    console.log($stateParams.myParam);

    $scope.coin=$stateParams.myParam;
})



