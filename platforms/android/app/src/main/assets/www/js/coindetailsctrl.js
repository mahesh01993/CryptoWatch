myApp.controller("coinDetailsCtrl", function ($scope, $ionicModal, $state,$stateParams,$state)
 {
    console.log($stateParams.myParam);

    $scope.coin=$stateParams.myParam;
    $scope.isThereInDashboard = function (id) {
        // to check coin id is there in dashboard or not
        //returns true if coin is there in dashboard
        //returns false if its not
        var item = localStorage.getItem('user');
        if (item) {
          var coins = item.split(",");
          for (var i = 0; i < coins.length; i++) {
            if (id == coins[i]) {
              return true;
            }
          }
        }
    
        return false;
      }
    $scope.addToDashboard = function (name) {
        var coins = localStorage.getItem('user').split(",");
        var isthere = false;
        if(!coins){
            coins=[]
          }
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
        console.log('removed', coins, localStorage.getItem('user').split(","))
        // $scope.updateCoin();
        $state.go('home')
      }
    
    $scope.removeCoin=function(x){
console.log(x)
$scope.addToDashboard(x.id)
    }
})



