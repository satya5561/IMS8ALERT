angular.module('IMS8Alert.controllers', [])

.controller('OpeninghourCtrl', function ($scope, $ionicPopup, $ionicModal) {
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

.controller('ChannelsCtrl', function ($scope, list, $ionicPopup, $ionicActionSheet, $ionicNavBarDelegate) {
    $scope.channels = list.allChannels();
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

    $scope.id = list.getid();
    $scope.contact = list.getContact($scope.id);

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

.controller('ContactCtrl', function ($scope, list, $state, $ionicModal, $ionicPopup, $ionicNavBarDelegate) {
    $scope.contacts = list.allContacts();
    $scope.contact = {};
    $scope.openContact = function (id) {
        list.setid(id);
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

.controller('AddressCtrl', function ($scope, $state, list, $rootScope, $ionicModal, $ionicPopup) {

    $scope.id = list.getid();
    $scope.location = list.getlocation($scope.id);
    $scope.location.group = $rootScope.selectedgrp;
    $scope.address = {};

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
            $scope.address.street = $scope.location.visitstreet;
            $scope.address.from = $scope.location.visitfrom;
            $scope.address.to = $scope.location.visitto;
            $scope.address.country = $scope.location.visitcountry;
            $scope.address.state = $scope.location.visitstate;
            $scope.address.zip = $scope.location.visitzip;
            $scope.address.city = $scope.location.visitcity;
        }
        else if ($scope.type == "invoice") {
            $scope.header = "Invoice Address";
            $scope.address.street = $scope.location.invoicestreet;
            $scope.address.from = $scope.location.invoicefrom;
            $scope.address.to = $scope.location.invoiceto;
            $scope.address.country = $scope.location.invoicecountry;
            $scope.address.state = $scope.location.invoicestate;
            $scope.address.zip = $scope.location.invoicezip;
            $scope.address.city = $scope.location.invoicecity;
        }
        $scope.mdladdress.show();
    };
    $scope.saveAddress = function () {
        if ($scope.type == "visit") {
            $scope.location.visitstreet = $scope.address.street;
            $scope.location.visitfrom = $scope.address.from;
            $scope.location.visitto = $scope.address.to;
            $scope.location.visitcountry = $scope.address.country;
            $scope.location.visitstate = $scope.address.state;
            $scope.location.visitzip = $scope.address.zip;
            $scope.location.visitcity = $scope.address.city;
        }
        else if ($scope.type == "invoice") {
            $scope.location.invoicestreet = $scope.address.street;
            $scope.location.invoicefrom = $scope.address.from;
            $scope.location.invoiceto = $scope.address.to;
            $scope.location.invoicecountry = $scope.address.country;
            $scope.location.invoicestate = $scope.address.state;
            $scope.location.invoicezip = $scope.address.zip;
            $scope.location.invoicecity = $scope.address.city;
        }
        list.setlocation($scope.location);
        $scope.mdladdress.hide();
    };

    $scope.cancelAddress = function () {
        $scope.mdladdress.hide();
    };

    $scope.countries = list.allCountries();
    $scope.selectedcountry = "";
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
        $scope.mdlcountry.hide();
    };

    // Model for state list
    $scope.states = list.allStates();
    $scope.selectedstate = "";
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
    function getGroupMember(groupId,customerId) {
        iAdminServiceClient.groupMembersGet(groupId,customerId)
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
        $rootScope.selectedgrp = itmgrp;
        $scope.selectedgrp = itmgrp;
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
.controller('LoginCtrl', function ($scope, $state, iAdminServiceClient, $window) {
    $scope.userinfo = {};

    $scope.doLogin = function () {

        iAdminServiceClient.authorize($scope.userinfo)
                  .success(function (data, status) {
                      var resultToken = data.DB_Rad_Authorize2Result;
                      if (resultToken > 0) {
                          $window.sessionStorage.token = resultToken;
                          $state.go("page.home");
                      }
                  })
                  .error(function (error, status) {

                  });


    }
})
.controller('LocationsCtrl', function ($scope, list, $state) {
    $scope.locations = list.allLocations();

    $scope.doNext = function () {
        if ($scope.selectedId)
            $state.go("tab.address");
    }

    $scope.selectlocation = function (channel, idx) {
        if ($scope.selectedLocationIndex != idx) {
            $scope.selectedLocationIndex = idx;
            $scope.selectedId = channel.id;
            list.setid($scope.selectedId);
        }
    }
});