var baseURL = "";//iSignage.svc/";
baseURL = "http://beta.databeat.net/ims8qcwcf/"; //iSignage.svc/"; //dbp8
apiUrl = baseURL + "iSignage.svc/";
function getThumb(id, what, isnodef) {
    var s = isEmptyValue(isnodef) ? '' : 1;
    return baseURL + "thumbnailer.ashx?ID=" + id + "&WHAT=" + what + "&tmp=" + Math.floor(Math.random() * 1001) + "&nodef=" + s;

}
function isEmptyValue(value) { if (value == "" || value == 0 || value == undefined || value == null) { return true; } else { return false; } }
function isEmpty(value) { if (value === "" || value == undefined) { return true; } else { return false; } }
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'IMS8Alert' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'IMS8Alert.services' is found in services.js
// 'IMS8Alert.controllers' is found in controllers.js
angular.module('IMS8Alert', ['ionic', 'IMS8Alert.controllers', 'IMS8Alert.services', 'IMS8Alert.directives', 'ngCordova'])

.run(function ($ionicPlatform, $rootScope, $window, $location, $state, $ionicPopup, $cordovaNetwork) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });

    $rootScope.$on("$routeChangeSuccess", function () {
        $rootScope.loading = false;
    });

    $rootScope.$on('$routeChangeStart', function (scope, next, current) {
        $rootScope.loading = true;
        if (!$window.sessionStorage.token) {
            $location.path("/page/login");
        }
    });

    $rootScope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    $rootScope.getItemHeight = function (item, index) {
        //Make evenly indexed items be 10px taller, for the sake of example
        return (index % 2) === 0 ? 50 : 60;
    };
   
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call 
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
         .state('page', {
             url: "/page",
             abstract: true,
             templateUrl: "templates/page.html"
         })
      // Each tab has its own nav history stack:
         .state('page.login', {
             url: '/login',
             templateUrl: 'templates/page-login.html',
             controller: 'LoginCtrl'
         })
         .state('page.home', {
             url: '/home',
             templateUrl: 'templates/page-home.html',
             controller: 'HomeCtrl'
         })
          .state('page.locations', {
              url: '/locations',
              templateUrl: 'templates/page-locations.html',
              controller: 'LocationsCtrl'
          })
           .state('page.edit-contact', {
               url: '/edit-contact',
               templateUrl: 'templates/page-edit-contact.html',
               controller: 'OpeninghourCtrl'
           })
            //.state('page.visitaddress', {
            //    url: '/visitaddress',
            //    templateUrl: 'templates/page-visitaddress.html',
            //    controller: 'VisitAddressCtrl'
            //})

      // setup an abstract state for the tabs directive
      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

      .state('tab.dash', {
          url: '/dash',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/tab-dash.html',
                  controller: 'DashCtrl'
              }
          }
      })

      .state('tab.friends', {
          url: '/friends',
          views: {
              'tab-friends': {
                  templateUrl: 'templates/tab-friends.html',
                  controller: 'FriendsCtrl'
              }
          }
      })
      .state('tab.friend-detail', {
          url: '/friend/:friendId',
          views: {
              'tab-friends': {
                  templateUrl: 'templates/friend-detail.html',
                  controller: 'FriendDetailCtrl'
              }
          }
      })

      .state('tab.account', {
          url: '/account',
          views: {
              'tab-account': {
                  templateUrl: 'templates/tab-account.html',
                  controller: 'AccountCtrl'
              }
          }
      }).state('tab.contacts', {
          url: '/contacts',
          views: {
              'tab-contacts': {
                  templateUrl: 'templates/tab-contacts.html',
                  controller: 'ContactCtrl'
              }
          }
      })
        .state('tab.contact-details', {
            url: '/contact-details',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/tab-contact-details.html',
                    controller: 'ContactDetailCtrl'
                }
            }
        })

        .state('tab.channels', {
            url: '/channels',
            views: {
                'tab-channels': {
                    templateUrl: 'templates/tab-channels.html',
                    controller: 'ChannelsCtrl'
                }
            }
        })
          .state('tab.address', {
              url: '/address',
              views: {
                  'tab-address': {
                      templateUrl: 'templates/tab-address.html',
                      controller: 'AddressCtrl'
                  }
              }
          })

        .state('tab.openinghour', {
            url: '/openinghour',
            views: {
                'tab-opening': {
                    templateUrl: 'templates/tab-openinghour.html',
                    controller: 'OpeninghourCtrl'
                }
            }
        })



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/page/login');

});

