// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic', 'ui.router'])

  .run(function ($ionicPlatform, $rootScope, $ionicHistory) {


    $ionicPlatform.registerBackButtonAction(function (e) {


      // $ionicHistory.goBack();
      navigator.app.backHistory();
      // alert(e)
      // if ($rootScope.$viewHistory.backView) {
      //   $rootScope.$viewHistory.backView.go();
      // } else {
      //   var confirmPopup = $ionicPopup.confirm({
      //     title: 'Confirm Exit',
      //     template: "Are you sure you want to close APPNAME?"
      //   });
      //   confirmPopup.then(function (close) {
      //     if (close) {
      //       // there is no back view, so close the app instead
      //       ionic.Platform.exitApp();
      //       navigator.app.exitApp();
      //     } // otherwise do nothing
      //     console.log("User canceled exit.");
      //   });
      // }

      // e.preventDefault();
      // return false;



      // alert("from run element")
    }, 101);

    $ionicPlatform.ready(function () {


      //------------------facebook ads network
      // var ad_units = {
      //   ios: {
      //     banner: "1636223679733260_1636229033066058",

      //   },
      //   android: {
      //     banner: "1636223679733260_1636229033066058",

      //   }
      // };

      // var adid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;

      // // if(FacebookAds) FacebookAds.setOptions({
      // //   isTesting: true,
      // //   deviceHash: 'copy_your_hash_id_from_console_here'
      // // });
      // if (FacebookAds) FacebookAds.createBanner(adid.banner);
      // if (FacebookAds) FacebookAds.createBanner({
      //   adId: adid.banner,
      //   position: FacebookAds.AD_POSITION.BOTTOM_CENTER,
      //   autoShow: true
      // });
      // ----------------------------------end of facebook ads



      // -------------------------google ads unit
      var admobid = {}
      if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-3705673445248218/1063785645',
        }
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
          banner: 'ca-app-pub-3705673445248218/1063785645',
        }
      }


      admob.banner.config({
        id: admobid.banner,
        autoShow: true,
      })
      admob.banner.prepare();
      // -------------------------end of google ads unit






      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
        // $ionicPlatform.onHardwareBackButton(function (event) {
        //   event.preventDefault();
        //   event.stopPropagation();
        //   console.log("backing yooooo")
        //   // alert('going back now yall');
        // });
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    // for http request with session
    $stateProvider
      .state('viewall', {
        url: "/viewall",
        templateUrl: 'pages/viewall.html',
        controller: 'ViewAllCtrl'
      })
      .state('home', {
        url: "/",
        templateUrl: 'pages/home.html',
        controller: 'HomeCtrl'
      })
      .state('option', {
        url: "/option",
        templateUrl: 'pages/option.html',
        controller: 'OptionCtrl'
      })
      .state('search', {
        url: "/search",
        templateUrl: 'pages/search.html',
        controller: 'SearchCtrl'
      })
      .state('selectcurrency', {
        url: "/currency",
        templateUrl: "pages/currency.html",
        controller: "CurrencyCtrl"
      })
      .state('aboutus', {
        url: "/aboutus",
        templateUrl: "pages/aboutus.html",
        controller: "aboutCtrl"
      })
      .state('coindetails', {
        url: "/coindetails/{myParam:json}",
        // url: '/myState/{myParam:json}',
        params: {
          myParam: null
        },
        //   params: [
        //     'myParam'
        // ],
        templateUrl: "pages/coindetails.html",
        controller: "coinDetailsCtrl"
      })


    $urlRouterProvider.otherwise("/");
  }

)

myApp.controller("mainCtrl", function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('pages/model/option.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.option = modal;
  });

  $scope.openOption = function () {
    $scope.option.show();
  }

  $scope.closeOption = function () {
    $scope.option.hide();
  };

})
