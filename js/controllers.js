angular.module('IMS8Alert.controllers', [])

.controller('OpeninghourCtrl', function ($scope, $ionicPopup, $ionicModal, $rootScope) {
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

.controller('ChannelsCtrl', function ($scope, list, $ionicPopup, $ionicActionSheet, $ionicNavBarDelegate, $rootScope, iAdminServiceClient) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    getLocationChannels($rootScope.LocationId);
    function getLocationChannels(LocationId) {
        iAdminServiceClient.getLocationMplayerList(LocationId)
        .success(function (data) {
            if (data.Location_LocationPlayersGetResult != null)
                $scope.channels = data.Location_LocationPlayersGetResult;
       })
        .error(function (error, data) {
      
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

.controller('ContactDetailCtrl', function ($scope, $state, list, $rootScope, $ionicModal, $ionicPopup, $ionicNavBarDelegate) {

   
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

.controller('ContactCtrl', function ($scope, list, $state, $ionicModal, $ionicPopup, $ionicNavBarDelegate, $rootScope,iAdminServiceClient) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    getLocationContacts($rootScope.CustomerID, $rootScope.groupID, $rootScope.MemberID);
    function getLocationContacts(customerId, groupId, memberId) {
        iAdminServiceClient.getLocationContacts(customerId, groupId, memberId, 0)
            .success(function (data) {
                var result = data.Location_GetLocationContactsResult;
                if (result)
                    $scope.contacts = result;
            })

           .error(function (error, data) {
             
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

.controller('AddressCtrl', function ($scope, $state, list, $rootScope, iAdminServiceClient, $ionicModal, $ionicPopup) {

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
        $scope.type = type;
        if ($scope.type == "visit") {
            $scope.header = "Visit Address";
            $scope.address.street = $scope.visitAddress[0].Street;
            $scope.address.from = $scope.visitAddress[0].AddressFrom;
            $scope.address.to = $scope.visitAddress[0].AddressTo;
            $scope.address.country = $scope.visitAddress[0].Country;
            $scope.address.state = $scope.visitAddress[0].State;
            $scope.address.zip = $scope.visitAddress[0].Zip;
            $scope.address.city = $scope.visitAddress[0].City;
        }
        else if ($scope.type == "invoice") {
            $scope.header = "Invoice Address";
            $scope.address.street = $scope.invoiceAddress[0].Street;
            $scope.address.from = $scope.invoiceAddress[0].AddressFrom;
            $scope.address.to = $scope.invoiceAddress[0].AddressTo;
            $scope.address.country = $scope.invoiceAddress[0].Country;
            $scope.address.state = $scope.invoiceAddress[0].State;
            $scope.address.zip = $scope.invoiceAddress[0].Zip;
            $scope.address.city = $scope.invoiceAddress[0].City;
        }
        $scope.mdladdress.show();
    };
    $scope.saveAddress = function () {
        if ($scope.type == "visit") {
            $scope.visitAddress[0].Street = $scope.address.street;
            $scope.visitAddress[0].AddressFrom = $scope.address.from;
            $scope.visitAddress[0].AddressTo = $scope.address.to;
            $scope.visitAddress[0].Country = $scope.address.country;
            $scope.visitAddress[0].State = $scope.address.state;
            $scope.visitAddress[0].Zip = $scope.address.zip;
            $scope.visitAddress[0].City = $scope.address.city;
        }
        else if ($scope.type == "invoice") {
            $scope.invoiceAddress[0].Street = $scope.address.street;
            $scope.invoiceAddress[0].AddressFrom = $scope.address.from;
            $scope.invoiceAddress[0].AddressTo = $scope.address.to;
            $scope.invoiceAddress[0].Country = $scope.address.country;
            $scope.invoiceAddress[0].State = $scope.address.state;
            $scope.invoiceAddress[0].Zip = $scope.address.zip;
            $scope.invoiceAddress[0].City = $scope.address.city;
        }
        $scope.mdladdress.hide();
    };

    $scope.cancelAddress = function () {
        $scope.mdladdress.hide();
    };
    getCountries();
    function getCountries() {
        iAdminServiceClient.lookupsGet('COUNTRY')
               .success(function (data) {
                   $scope.countries = data.Location_LookupsGetResult;
                })
                .error(function (error, data) {
                });
    }
    $scope.onZipChanged = function (country, zip) {
        var _countryid = _.find($scope.countries, function (t) { return t.Name == country }).Id;
        if (zip && _countryid) {
            iAdminServiceClient.getPODetail(zip, _countryid)
           .success(function (data) {
               var poDetail = data.User_GetPOCodeDetailResult;
               if (poDetail.CountryName == $scope.address.country) {
                   $scope.address.city = (poDetail == null) ? "" : angular.uppercase(poDetail.POName);
               }
           })
            .error(function (error, data) {

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
        $scope.address.country = itmcountry;
        $scope.onZipChanged($scope.address.country, $scope.address.zip);
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
        $scope.address.state = itmstate;
        $scope.mdlstate.hide();

    };
})

.controller('HomeCtrl', function ($scope, $rootScope, $ionicModal, $state, list, iAdminServiceClient) {

    getCustomers();
    $scope.doNext = function () {
        if ($scope.selectedcstomer && $scope.selectedgrp && $scope.selectedpro)
            $state.go("page.locations");
    }

    function getCustomers() {
        iAdminServiceClient.getCustomers()
                       .success(function (data, status) {
                           var result = data.User_GetCustomersResult;
                           if (result) {
                               $scope.customers = result;
                           }
                       })
                       .error(function (error, status) {
                       });
    }
    function getGroups(customerId) {
        iAdminServiceClient.getGroups(customerId)
                       .success(function (data, status) {
                           var result = data.Location_GetGroupsResult;
                           if (result) {
                               $scope.groups = result;
                           }
                       })
                       .error(function (error, status) {
                       });
    }
    function getGroupMember(groupId, customerId) {
        iAdminServiceClient.groupMembersGet(groupId, customerId)
                       .success(function (data, status) {
                           var result = data.Location_GetGroupMembersResult;
                           if (result) {
                               $scope.profiles = result;
                           }
                       })
                       .error(function (error, status) {
                       });
    }


    //$scope.customers = list.allCustomers();
    $scope.selectedcstomer = "";
    $ionicModal.fromTemplateUrl('templates/modal/modal-customer.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlcust = modal; });
    $scope.openModalCust = function () {
        $scope.mdlcust.show();
    };
    $scope.applyModalCust = function (itmcust) {
        $scope.selectedcstomer = itmcust;
        $rootScope.CustomerID = $scope.selectedcstomer.CustomerID;
        getGroups($scope.selectedcstomer.CustomerID);
        $scope.mdlcust.hide();
    };

    // Model for Group list
    //$scope.groups = list.allGroups();
    $scope.selectedgrp = "";
    $ionicModal.fromTemplateUrl('templates/modal/modal-group.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlgrp = modal; });
    $scope.openModalGrp = function () {
        $scope.mdlgrp.show();
    };
    $scope.applyModalGrp = function (itmgrp) {
        $scope.selectedgrp = itmgrp;
        $rootScope.groupID = $scope.selectedgrp.GroupId;
        $rootScope.groupName = $scope.selectedgrp.Name;
        getGroupMember($scope.selectedgrp.GroupId, $scope.selectedcstomer.CustomerID);
        $scope.mdlgrp.hide();

    };
    // Model for Profile list
    //$scope.profiles = list.allProfiles();
    $scope.selectedpro = "";
    $ionicModal.fromTemplateUrl('templates/modal/modal-profile.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlpro = modal; });
    $scope.openModalPro = function () {
        $scope.mdlpro.show();
    };
    $scope.applyModalPro = function (itmpro) {
        $scope.selectedpro = itmpro;
        $rootScope.MemberID = $scope.selectedpro.GroupMemberId;
        $scope.mdlpro.hide();
    };
    // Model for Language list
    $scope.languages = list.allLanguages();
    $scope.selectedlang = "";
    $ionicModal.fromTemplateUrl('templates/modal/modal-language.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdllang = modal; });
    $scope.openModalLang = function () {
        $scope.mdllang.show();
    };
    $scope.applyModalLang = function (itmlang) {
        $scope.selectedlang = itmlang;
        $scope.mdllang.hide();
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
.controller('LoginCtrl', function ($scope, $state, iAdminServiceClient, $window, $ionicPopup) {
    $scope.userinfo = {};

    $scope.doLogin = function () {

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
                  })
                  .error(function (error, status) {
                      var confirmPopup = $ionicPopup.alert({
                          title: 'Alert Mode',
                          template: 'Error in authentication'
                      });
                  });


    }
})
.controller('LocationsCtrl', function ($scope, list, $state, $rootScope, iAdminServiceClient) {
    getLocationAddresses($rootScope.CustomerID, $rootScope.groupID, $rootScope.MemberID);
    function getLocationAddresses(customerId, groupId, memberId) {
        iAdminServiceClient.getLocationAddresses(customerId, groupId, memberId, 0)
            .success(function (data) {
                    var result = data.Location_GetLocationAddressesResult;
                if (result)
                    $scope.locations = result;

            })
         .error(function (error, data) {
           
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
            $rootScope.visitAddress = _.where($scope.locations, { AddressType: 'Visit', LocationId: $scope.selectedId });
            $rootScope.invoiceAddress = _.where($scope.locations, { AddressType: 'Invoice', LocationId: $scope.selectedId });
        }
    }
});