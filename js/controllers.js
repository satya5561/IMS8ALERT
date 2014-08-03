angular.module('IMS8Alert.controllers', [])

.controller('OpeninghourCtrl', function ($scope, $ionicPopup, $ionicModal, $rootScope, $ionicLoading) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location __ will be set in Alert mode. This will be applied to __ media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                }
                $("#cbAlertMode").prop('checked', $scope.alertChecked);
            });
        }
    };
    $ionicModal.fromTemplateUrl('templates/modal/modal-time.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdltime = modal; });
    $scope.openModalTime = function () {
        $scope.mdltime.show();
    };

})

.controller('ChannelsCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicNavBarDelegate, $rootScope, iAdminServiceClient, $ionicLoading) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    getLocationChannels($rootScope.LocationId);
    function getLocationChannels(LocationId) {
        $ionicLoading.show();
        iAdminServiceClient.getLocationMplayerList(LocationId)
        .success(function (data) {
            $ionicLoading.hide();
            if (data.Location_LocationPlayersGetResult != null)
                $scope.channels = data.Location_LocationPlayersGetResult;
        })
        .error(function (error, data) {
            $ionicLoading.hide();

        });
    }

    $scope.goBack = function () {
        $ionicNavBarDelegate.back();
    };
    $scope.showActionsheet = function () {

        $ionicActionSheet.show({
            buttons: [
             { text: 'Reset' },
             { text: 'Reboot' },
             { text: 'Display Info On Screen' },
             { text: 'Request Help' },
            ],
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttonClicked: function (index) {
                var txt = 'first';
                console.log('BUTTON CLICKED', index);
                return true;
            },
        });
    };

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location __ will be set in Alert mode. This will be applied to __ media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                }
                $("#cbAlertMode").prop('checked', $scope.alertChecked);
            });
        }
    };
})

.controller('ContactDetailCtrl', function ($scope, $state, list, $rootScope, $ionicModal, $ionicPopup, $ionicNavBarDelegate, $ionicLoading) {


    $scope.contact = $rootScope.contact;

    $scope.goBack = function () {
        $ionicNavBarDelegate.back();
    };

    $ionicModal.fromTemplateUrl('templates/modal/modal-editContact.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'

    }).then(function (modal) { $scope.mdleditcontact = modal; });

    $scope.openModalContact = function () {
        $scope.isEdit = true;
        $scope.header = "Edit Contact";
        $scope.mdleditcontact.show();
    };
    $scope.saveContact = function () {
        $scope.mdleditcontact.hide();
    };

    $scope.cancelContact = function () {
        $scope.mdleditcontact.hide();
    };

    $scope.roles = list.allRoles();
    $ionicModal.fromTemplateUrl('templates/modal/modal-role.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlrole = modal; });
    $scope.openModalRole = function () {
        $scope.mdlrole.show();
    };
    $scope.applyModalRole = function (itmrole) {
        $scope.contact.role = itmrole;
    };
    $scope.doneModalRole = function () {
        $scope.mdlrole.hide();
    };
    $scope.cancelModalRole = function () {
        $scope.mdlrole.hide();
    };
})

.controller('ContactCtrl', function ($scope, list, $state, $ionicModal, $ionicPopup, $ionicNavBarDelegate, $rootScope, iAdminServiceClient,  $ionicLoading) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    getLocationContacts($rootScope.CustomerID, $rootScope.groupID, $rootScope.MemberID);
    function getLocationContacts(customerId, groupId, memberId) {
        $ionicLoading.show();
        iAdminServiceClient.getLocationContacts(customerId, groupId, memberId, 0)
            .success(function (data) {
                var result = data.Location_GetLocationContactsResult;
                $ionicLoading.hide();
                if (result)
                    $scope.contacts = result;
            })

           .error(function (error, data) {
               $ionicLoading.hide();
           });
    }
    $scope.openContact = function (contact) {
        $rootScope.contact = contact;
        $state.go("tab.contact-details");
    };

    $scope.goBack = function () {
        $ionicNavBarDelegate.back();
    };

    $ionicModal.fromTemplateUrl('templates/modal/modal-editContact.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdleditcontact = modal; });

    $scope.openModalContact = function () {
        $scope.isEdit = false;
        $scope.header = "Add Contact";
        $scope.mdleditcontact.show();
    };
    $scope.saveContact = function () {
        $scope.mdleditcontact.hide();
    };

    $scope.cancelContact = function () {
        $scope.mdleditcontact.hide();
    };

    $scope.roles = list.allRoles();
    $ionicModal.fromTemplateUrl('templates/modal/modal-role.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlrole = modal; });
    $scope.openModalRole = function () {
        $scope.mdlrole.show();
    };
    $scope.applyModalRole = function (itmrole) {
        $scope.contact.role = itmrole;
    };
    $scope.doneModalRole = function () {
        $scope.mdlrole.hide();
    };
    $scope.cancelModalRole = function () {
        $scope.mdlrole.hide();
    };


    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location __ will be set in Alert mode. This will be applied to __ media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                }
                $("#cbAlertMode").prop('checked', $scope.alertChecked);
            });
        }
    };
})

.controller('AddressCtrl', function ($scope, $state, list, $rootScope, iAdminServiceClient, $ionicModal, $ionicPopup, $ionicLoading) {

    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    $scope.address = {};
    $scope.visitAddress = $rootScope.visitAddress;
    $scope.invoiceAddress = $rootScope.invoiceAddress;

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location __ will be set in Alert mode. This will be applied to __ media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                }
                $("#cbAlertMode").prop('checked', $scope.alertChecked);
            });
        }
    };

    $ionicModal.fromTemplateUrl('templates/modal/modal-visitaddress.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdladdress = modal; });

    $scope.openModalAddress = function (type) {
        $ionicLoading.show();
        $scope.type = type;
        if ($scope.type == "visit" && $scope.visitAddress) {
            $scope.header = "Visit Address";
            $scope.address = $scope.visitAddress;
          }
        else if ($scope.type == "invoice" && $scope.invoiceAddress) {
            $scope.header = "Invoice Address";
            $scope.address = $scope.invoiceAddress;
        }
        $ionicLoading.hide();
        $scope.mdladdress.show();
    };
    $scope.saveAddress = function () {
        $ionicLoading.show();
        if ($scope.type == "visit") {
            $scope.visitAddress = $scope.address;
        }
        else if ($scope.type == "invoice") {
            $scope.invoiceAddress=$scope.address;
        }
        $ionicLoading.hide();
        $scope.mdladdress.hide();
    };

    $scope.cancelAddress = function () {
        $scope.mdladdress.hide();
    };
    getCountries();
    function getCountries() {
        $ionicLoading.show();
        iAdminServiceClient.lookupsGet('COUNTRY')
               .success(function (data) {
                   $ionicLoading.hide();
                   $scope.countries = data.Location_LookupsGetResult;
               })
                .error(function (error, data) {
                    $ionicLoading.hide();
                });
    }
    $scope.onZipChanged = function (country, zip) {
        var _countryid = _.find($scope.countries, function (t) { return t.Name == country }).Id;
        if (zip && _countryid) {
            $ionicLoading.show();
            iAdminServiceClient.getPODetail(zip, _countryid)
           .success(function (data) {
               var poDetail = data.User_GetPOCodeDetailResult;
               $ionicLoading.hide();
               if (poDetail.CountryName == $scope.address.Country) {
                   $scope.address.City = (poDetail == null) ? "" : angular.uppercase(poDetail.POName);
               }
           })
            .error(function (error, data) {
                $ionicLoading.hide();
            });
        }
    };

    $ionicModal.fromTemplateUrl('templates/modal/modal-country.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlcountry = modal; });
    $scope.openModalCountry = function () {
        $scope.mdlcountry.show();
    };
    $scope.applyModalCountry = function (itmcountry) {
        $scope.address.Country = itmcountry;
        $scope.onZipChanged($scope.address.Country, $scope.address.Zip);
        $scope.mdlcountry.hide();
    };

    // Model for state list
    $scope.states = list.allStates();

    $ionicModal.fromTemplateUrl('templates/modal/modal-state.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlstate = modal; });
    $scope.openModalState = function () {
        $scope.mdlstate.show();
    };
    $scope.applyModalState = function (itmstate) {
        $scope.address.State = itmstate;
        $scope.mdlstate.hide();

    };
})

.controller('HomeCtrl', function ($scope, $rootScope, $ionicModal, $state, iAdminServiceClient, $ionicLoading) {

     getCustomers();
     if ($rootScope.CustomerName) {
         $scope.selectedcstomer = $rootScope.CustomerName;
         getGroups($rootScope.CustomerID);
     }
     else
         $scope.selectedcstomer = "";
    if ($rootScope.groupName)
    {
        $scope.selectedgrp = $rootScope.groupName;
        getGroupMember($rootScope.GroupId, $rootScope.CustomerID);
    }
    else
        $scope.selectedgrp = "";
    if ($rootScope.proName)
    {
        $scope.selectedpro = $rootScope.proName;
    }
    else
        $scope.selectedpro = "";
    $scope.doNext = function () {
        if ($scope.selectedcstomer && $scope.selectedgrp && $scope.selectedpro)
            $state.go("page.locations");
    }

    function getCustomers() {
        $ionicLoading.show();
        iAdminServiceClient.getCustomers()
                       .success(function (data, status) {
                           var result = data.User_GetCustomersResult;
                           $ionicLoading.hide();
                           if (result) {
                               $scope.customers = result;
                           }
                       })
                       .error(function (error, status) {
                           $ionicLoading.hide();
                       });
    }
    function getGroups(customerId) {
        $ionicLoading.show();
        iAdminServiceClient.getGroups(customerId)
                       .success(function (data, status) {
                           var result = data.Location_GetGroupsResult;
                           $ionicLoading.hide();
                           if (result) {
                               $scope.groups = result;
                           }
                       })
                       .error(function (error, status) {
                           $ionicLoading.hide();
                       });
    }
    function getGroupMember(groupId, customerId) {
        $ionicLoading.show();
        iAdminServiceClient.groupMembersGet(groupId, customerId)
                       .success(function (data, status) {
                           var result = data.Location_GetGroupMembersResult;
                           $ionicLoading.hide();
                           if (result) {
                               $scope.profiles = result;
                           }
                       })
                       .error(function (error, status) {
                           $ionicLoading.hide();
                       });
    }
  
    $ionicModal.fromTemplateUrl('templates/modal/modal-customer.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlcust = modal; });
    $scope.openModalCust = function () {
        $scope.mdlcust.show();
    };
    $scope.applyModalCust = function (itmcust) {
        $scope.selectedcstomer = itmcust.CustomerName;
        if ($rootScope.CustomerID != itmcust.CustomerID)
        {
            $scope.selectedgrp = $rootScope.groupName="";
            $scope.selectedpro = $rootScope.proName = "";
        }
        $rootScope.CustomerID = itmcust.CustomerID;
        $rootScope.CustomerName = $scope.selectedcstomer;
        getGroups(itmcust.CustomerID);
        $scope.mdlcust.hide();
    };

    // Model for Group 
    
    $ionicModal.fromTemplateUrl('templates/modal/modal-group.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlgrp = modal; });
    $scope.openModalGrp = function () {
        $scope.mdlgrp.show();
    };
    $scope.applyModalGrp = function (itmgrp) {
        $scope.selectedgrp = itmgrp.Name;
        $rootScope.groupID = itmgrp.GroupId;
        $rootScope.groupName = $scope.selectedgrp;
        getGroupMember(itmgrp.GroupId, $rootScope.CustomerID);
        $scope.mdlgrp.hide();

    };
    // Model for Profile 
    
    $ionicModal.fromTemplateUrl('templates/modal/modal-profile.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlpro = modal; });
    $scope.openModalPro = function () {
        $scope.mdlpro.show();
    };
    $scope.applyModalPro = function (itmpro) {
        $scope.selectedpro = itmpro.Name;
        $rootScope.proName = itmpro.Name;
        $rootScope.MemberID = itmpro.GroupMemberId;
        $scope.mdlpro.hide();
    };
})

.controller('AccountCtrl', function ($scope) {
})
.controller('MainController', function ($rootScope, $scope, $location) {
    $scope.isSpecificPage = function () {
        var path;
        return path = $location.path(), _.contains(["/404", "/login", "/signin", "/"], path)
    }

    $scope.userAgent = navigator.userAgent;
})
.controller('LoginCtrl', function ($scope, $state, iAdminServiceClient, $window, $ionicPopup, $ionicLoading) {
    $scope.userinfo = {};

    $scope.doLogin = function () {
        $ionicLoading.show();
        iAdminServiceClient.authorize($scope.userinfo)
                  .success(function (data, status) {
                      var resultToken = data.DB_Rad_Authorize2Result;
                      if (resultToken > 0) {
                          $window.sessionStorage.token = resultToken;
                          $state.go("page.home");
                      }
                      else {
                          var confirmPopup = $ionicPopup.alert({
                              title: 'Alert Mode',
                              template: 'Wrong username/password'
                          });
                      }
                      $ionicLoading.hide();
                  })
                  .error(function (error, status) {
                      var confirmPopup = $ionicPopup.alert({
                          title: 'Alert Mode',
                          template: 'Error in authentication'
                      });
                      $ionicLoading.hide();
                  });


    }
})
.controller('LocationsCtrl', function ($scope, $state, $rootScope, iAdminServiceClient, $ionicLoading) {
    getLocationAddresses($rootScope.CustomerID, $rootScope.groupID, $rootScope.MemberID);
    function getLocationAddresses(customerId, groupId, memberId) {
        $ionicLoading.show();
        iAdminServiceClient.getLocationAddresses(customerId, groupId, memberId, 0)
            .success(function (data) {
                var result = data.Location_GetLocationAddressesResult;
                $ionicLoading.hide();
                if (result)
                    $scope.locations = result;

            })
         .error(function (error, data) {
             $ionicLoading.hide();
         });
    }

    $scope.doNext = function () {
        if ($scope.selectedId)
            $state.go("tab.address");
    }

    $scope.selectlocation = function (loc, idx) {
        if ($scope.selectedLocationIndex != idx) {
            $scope.selectedLocationIndex = idx;
            $scope.selectedId = loc.LocationId;
            $rootScope.LocationId = $scope.selectedId;
            $rootScope.LocationName = loc.LocationName;
            $rootScope.visitAddress = _.where($scope.locations, { AddressType: 'Visit', LocationId: $scope.selectedId })[0];
            $rootScope.invoiceAddress = _.where($scope.locations, { AddressType: 'Invoice', LocationId: $scope.selectedId })[0];
        }
    }
});