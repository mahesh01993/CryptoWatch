// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp=angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myApp.controller("HomeCtrl", function ($scope, $http, $interval) {
    
  console.log("this is sparta")
  $scope.ripple = "demo rate now but soon will be live"
  $http({
      url: "https://api.coinmarketcap.com/v1/ticker/",
      method: "GET",
      // params: {user_id: user.id}
  }).then(function (data) {
      console.log(data, "http request")
      if (data.statusText = "OK") {
          $('.loader').css("display","none")
          $scope.data=data.data;
          $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + data.data[1].last_updated

      }
  })

  // usd to inr 
 
  $http({
      url: "https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y",
      method: "GET",
  }).then(function (data) {
      console.log(data, "currency rate")
      $scope.USD_INR=data.data.USD_INR.val;
  })


  var i = 0;

  $scope.updateCoin = function () {
      console.log(i++)
      $http({
          url: "https://api.coinmarketcap.com/v1/ticker/",
          method: "GET",
      }).then(function (data) {
      
          if (data.statusText = "OK") {
              $scope.data=data.data;
              var lastupdate=new Date(parseInt(data.data[1].last_updated))
              $scope.ripple = data.data[1].price_usd + "$" + "   last updated  on" + lastupdate;
          } else {
              $scope.ripple = "Some thing went wrong please try again some time "
          }
      })
  }

  var update = $interval($scope.updateCoin, 5000);
})