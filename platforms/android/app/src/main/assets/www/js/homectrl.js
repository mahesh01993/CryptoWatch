myApp.controller("HomeCtrl", function ($scope, $rootScope, $http, $interval, $ionicPlatform, $filter, $state, $timeout, $ionicPopup, $ionicModal, $ionicPopover) {

  //   $ionicPlatform.onHardwareBackButton(function(e) {
  //     console.log('back button called')
  //     e.stopPropagation();
  //     alert('you sure you want to exit?');
  //  });
  // console.log($rootScope.$viewHistory.backView,'backview from home')
  $scope.listedCoin = ["bitcoin", "ripple", "ethereum"]
  //   localStorage.setItem('user', $scope.listedCoin);
  //   console.log(localStorage.getItem('user', $scope.listedCoin).split(","))
  //   var array = string.split(",");
  $scope.sort = "rank"
  $scope.coins = localStorage.getItem('user')
  if ($scope.coins != null) {
    $scope.coins = $scope.coins.split(",");
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
        var dataa = data.data[0];
        dataa.rank = parseFloat(dataa.rank)
        dataa.price_usd = parseFloat(dataa.price_usd)
        dataa.percent_change_24h = parseFloat(dataa.percent_change_24h)
        dataa.percent_change_7d = parseFloat(dataa.percent_change_7d)
        dataa.percent_change_1h = parseFloat(dataa.percent_change_1h)


        $scope.ListofData.push(dataa)
        console.log(data, "inside fdfsdsdjfdh")
        //   $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + data.data[1].last_updated
      }
    })
  }




  $scope.update = function () {
    $scope.ListofData = [];
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
      }, function () {
        console.log("something went wrong")
      })
    }

    $scope.$broadcast('scroll.refreshComplete');
  }



  $scope.doRefresh = function () {
    $timeout(function () {
      $state.reload()
    }, 800)

  }


  $scope.changeSort = function (order) {
    if ($scope.sort == order) {
      $scope.sort = "-" + order;
    } else {
      $scope.sort = order;
    }
  }

  $scope.getrate = function (x) {
    return x["price_" + $filter('lowercase')($scope.currency)]
  }



  // $ionicModal.fromTemplateUrl('pages/model/coindetails.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // $ionicPopover.fromTemplateUrl('pages/model/coindetails.html', {
  //   scope: $scope
  // }).then(function (popover) {
  //   $scope.popover = popover;
  // });


  // $scope.coinDetails = function ($event, x) {

  //   $scope.selectedCoin = x;
  //   // $scope.modal.show();
  //   $scope.popover.show($event)
  // }
  // $scope.closePopover = function () {
  //   $scope.popover.hide();
  // };
  $scope.coinDetails = function (x) {
    $state.go("coindetails", {
      myParam: x
    })
  }


  //fn to make dashboard empty
  $scope.deleteAll = function () {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Empty Dashboard',
      template: "Are you sure you want to empty the Dashboard?  <div style=font-size:.6em;text-align:center>*some default coin will be added automatically</div>"
    });

    confirmPopup.then(function (res) {
      if (res) {
        console.log('You are sure');
        localStorage.setItem('user', [$scope.listedCoin]);
        $state.reload();
      } else {
        console.log('You are not sure');
      }
    });

  }


  // app exit


  $ionicPlatform.registerBackButtonAction(function (e) {

    console.log('back button clicked from home')
    navigator.app.exitApp();
  }, 102)





})
