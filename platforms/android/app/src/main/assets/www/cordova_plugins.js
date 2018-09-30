cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-facebookads.FacebookAds",
    "file": "plugins/cordova-plugin-facebookads/www/FacebookAds.js",
    "pluginId": "cordova-plugin-facebookads",
    "clobbers": [
      "window.FacebookAds"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-facebook-audnet-sdk": "4.26.2",
  "cordova-plugin-device": "1.1.4",
  "cordova-plugin-extension": "1.5.4",
  "cordova-plugin-facebookads": "4.23.2",
  "cordova-plugin-ionic-webview": "1.1.16",
  "cordova-plugin-network-information": "2.0.1",
  "cordova-plugin-whitelist": "1.3.1",
  "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});