myApp.controller("ViewAllCtrl", function ($scope, $http, $interval, $ionicActionSheet) {

  console.log("this is sparta")
  $scope.sort = "rank"
  $scope.ripple = "demo rate now but soon will be live"


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
      $('.loader').css("display", "none")
      $scope.data = data.data;
      angular.forEach($scope.data, function (dataa) {
        dataa.rank = parseFloat(dataa.rank);
        dataa.price_usd = parseFloat(dataa.price_usd);
        dataa.percent_change_24h = parseFloat(dataa.percent_change_24h);
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

  // usd to inr 

  // $http({
  //   url: "https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y",
  //   method: "GET",
  // }).then(function (data) {
  //   console.log(data, "currency rate")
  //   $scope.USD_INR = data.data.USD_INR.val;
  // })


  var i = 0;

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
          dataa.rank = parseFloat(dataa.rank);
          dataa.price_usd = parseFloat(dataa.price_usd);
          dataa.percent_change_24h = parseFloat(dataa.percent_change_24h);
          if ($scope.isThereInDashboard(dataa.id)) {
            dataa.in_dashboard = true;
          } else {
            dataa.in_dashboard = false;
          }
        });
        $scope.$broadcast('scroll.refreshComplete');
        console.log(i++)
      } else {
        $scope.ripple = "Some thing went wrong please try again some time "
      }
    })
  }

  // var update = $interval($scope.updateCoin, 5000);

  $scope.changesort = function (sort) {


    if ($scope.sort == sort) {
      $scope.sort = "-" + sort;
    } else {
      $scope.sort = sort;
    }

  }

  $scope.addToDashboard = function (name) {
    var coins = localStorage.getItem('user', $scope.listedCoin).split(",");
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


  $scope.doRefresh = function () {
    $scope.updateCoin();
    // $http.get('/new-items')
    //  .success(function(newItems) {
    //    $scope.items = newItems;
    //  })
    //  .finally(function() {
    //    // Stop the ion-refresher from spinning
    //    $scope.$broadcast('scroll.refreshComplete');
    //  });
  };

  $scope.coinOption = function (coin) {
    var name = coin.name;
    var id = coin.id;
    var isthere = $scope.isThereInDashboard(id)
    var option = "Add to Dashboard"
    if (isthere) {
      option = "Remove From Dashboard"
    }

    console.log(isthere, "is there")
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: option
      }, ],
      titleText: name,
      cancelText: 'Cancel',
      cancel: function () {
        // add cancel code..
        hideSheet()
      },
      buttonClicked: function (index) {
        console.log(index, "index aaaaa")
        if (index == 0) {
          $scope.addToDashboard(id)
        }
        return true;
      }
    });

  }
})
