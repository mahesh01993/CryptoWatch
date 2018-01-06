myApp.controller("CurrencyCtrl", function ($scope, $ionicModal, $state)
 {
    $scope.currency=localStorage.getItem('currency');
    if(!$scope.currency){
        localStorage.setItem('currency',"EUR");
        $scope.currency=localStorage.getItem('currency');
    }
    console.log($scope.currency,"in currency")

    $scope.data=['AUD',"BRL","CAD","CHF","CLP","CNY","CZK","DKK","EUR","GBP","HKD","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PKR","PLN","RUB","SEK","SGD","THB","TRY","TWD","ZAR"];


    $scope.selectCurrency=function(x){
        localStorage.setItem('currency',x);
        $state.go('option')
    }
})



