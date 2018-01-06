myApp.controller("HomeCtrl", function ($scope, $http, $interval,$filter,$state,$timeout) {
  $scope.listedCoin = ["bitcoin", "ripple", "ethereum"]
  //   localStorage.setItem('user', $scope.listedCoin);
  //   console.log(localStorage.getItem('user', $scope.listedCoin).split(","))
  //   var array = string.split(",");
  
  $scope.coins = localStorage.getItem('user')
  if($scope.coins!=null){
    $scope.coins=$scope.coins.split(",");
  }
  $scope.currency = localStorage.getItem('currency');

  //if selected coin is empty then select default one
  if (!$scope.coins || $scope.coins[0] == "") {
    localStorage.setItem('user', $scope.listedCoin);
    $scope.coins = localStorage.getItem('user').split(",");
  }

  //if currency selected is empty then select default one
  if (!$scope.currency) {
    localStorage.setItem('currency', "EUR");
    $scope.currency = localStorage.getItem('currency');
  }


  //to print the selected coins and currency
  console.log("coinsss", $scope.coins)
  console.log("currency ", $scope.currency)
  $scope.ListofData = []



  for (var i = 0; i < $scope.coins.length; i++) {
    console.log($scope.coins[i])
    $http({
      url: "https://api.coinmarketcap.com/v1/ticker/" + $scope.coins[i] + "/?convert=" + $scope.currency,
      method: "GET",
      // params: {user_id: user.id}
    }).then(function (data) {
      console.log(data, "http request")
      if (data.statusText = "OK") {
        //   $('.loader').css("display", "none")

        $scope.ListofData.push(data.data[0])

        //   $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + data.data[1].last_updated
      }
    })
  }



  $scope.update = function () {
    $scope.ListofData = [];
    for (var i = 0; i < $scope.coins.length; i++) {
      console.log($scope.coins[i])
      $http({
        url: "https://api.coinmarketcap.com/v1/ticker/" + $scope.coins[i] + "/?convert="+ $scope.currency,
        method: "GET",
        // params: {user_id: user.id}
      }).then(function (data) {
        console.log(data, "http request")
        if (data.statusText = "OK") {
          //   $('.loader').css("display", "none")
          $scope.ListofData.push(data.data[0])

          //   $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + data.data[1].last_updated
        }
      })
    }

    $scope.$broadcast('scroll.refreshComplete');
  }

 

  $scope.doRefresh = function () {
    $timeout(function(){
      $state.reload()
    },800)
   
  }




  $scope.getrate = function (x) {
   return x["price_"+$filter('lowercase')($scope.currency)]
  }

})
