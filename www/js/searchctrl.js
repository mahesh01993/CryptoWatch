myApp.controller("SearchCtrl", function ($scope, $http, $interval, $ionicActionSheet, $ionicPopup,$ionicPlatform) {
  console.log("In Search Ctrl");

  $scope.isThereInDashboard = function (id) {
    // to check coin id is there in dashboard or not
    //returns true if coin is there in dashboard
    //returns false if its not

    var coins = localStorage.getItem('user').split(",");
    for (var i = 0; i < coins.length; i++) {
      if (id == coins[i]) {
        return true;
      }
    }

    return false;
  }

  $http({
    url: "https://api.coinmarketcap.com/v1/ticker/",
    method: "GET",
    // params: {user_id: user.id}
  }).then(function (data) {
    console.log(data, "http request")
    if (data.statusText = "OK") {
      $scope.data = data.data;
      angular.forEach($scope.data, function (dataa) {
        // dataa.rank = parseFloat(dataa.rank);
        // dataa.price_usd = parseFloat(dataa.price_usd);
        // dataa.percent_change_24h = parseFloat(dataa.percent_change_24h);
        if ($scope.isThereInDashboard(dataa.id)) {
          dataa.in_dashboard = true;
        } else {
          dataa.in_dashboard = false;
        }
      });
      console.log($scope.data, "after to float")
      //   $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + data.data[1].last_updated

    }
  })

  $scope.addToDashboard = function (name) {
    var coins = localStorage.getItem('user').split(",");
    var isthere = false;
    console.log(name);
    for (var i = 0; i < coins.length; i++) {
      if (name == coins[i]) {
        isthere = true;
        coins.splice(i, 1);
        console.log(coins[i])
      }
    }
    if (!isthere) {
      coins.push(name)
    }
    localStorage.setItem('user', coins);
    console.log('removed', coins, localStorage.getItem('user', $scope.listedCoin).split(","))
    $scope.updateCoin();
  }

  $scope.updateCoin = function () {

    $http({
      url: "https://api.coinmarketcap.com/v1/ticker/",
      method: "GET",
    }).then(function (data) {

      if (data.statusText = "OK") {
        $scope.data = data.data;
        // var lastupdate = new Date(parseInt(data.data[1].last_updated))
        // $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + lastupdate;
        angular.forEach($scope.data, function (dataa) {
          //   dataa.rank = parseFloat(dataa.rank);
          //   dataa.price_usd = parseFloat(dataa.price_usd);
          //   dataa.percent_change_24h = parseFloat(dataa.percent_change_24h);
          if ($scope.isThereInDashboard(dataa.id)) {
            dataa.in_dashboard = true;
          } else {
            dataa.in_dashboard = false;
          }
        });
        $scope.$broadcast('scroll.refreshComplete');
        // console.log(i++)
      } else {
        console.log("something went wrong in updatecoin function")
      }
    })
  }
  $scope.coinOption = function (coin) {

    var name = coin.name;
    var id = coin.id;
    var isthere = $scope.isThereInDashboard(id)
    var option = "Add to Dashboard"
    if (isthere) {
      option = "Remove From Dashboard"
    }
    if (isthere) {
      //if coin is there then ask for remove
      var confirmPopup = $ionicPopup.confirm({
        title: "Remove "+coin.name,
        template: 'Remove This Coin from Your Dashboard ?'
      });
   
      confirmPopup.then(function(res) {
        if(res) {
          // console.log('You are sure');
          $scope.addToDashboard(id)
        } else {
          // console.log('You are not sure');
        }
      });
    }
    else{
//if coin is not there then ask for add

      console.log("else")
      var confirmPopup = $ionicPopup.confirm({
        title: "Add "+coin.name,
        template: 'Add This Coin To Your Dashboard ?'
      });
   
      confirmPopup.then(function(res) {
        if(res) {
          // console.log('You are sure');
          $scope.addToDashboard(id)
        } else {
          // console.log('You are not sure');
        }
      });
    }




    // console.log(isthere, "is there")
    // var hideSheet = $ionicActionSheet.show({
    //   buttons: [{
    //     text: option
    //   }, ],
    //   titleText: name,
    //   cancelText: 'Cancel',
    //   cancel: function () {
    //     // add cancel code..
    //     hideSheet()
    //   },
    //   buttonClicked: function (index) {
    //     console.log(index, "index aaaaa")
    //     if (index == 0) {
    //       $scope.addToDashboard(id)
    //     }
    //     return true;
    //   }
    // });

  }

  $ionicPlatform.registerBackButtonAction(function (e) {
  
    console.log('back button clicked from search')
    navigator.app.backHistory();
  },102)
})
