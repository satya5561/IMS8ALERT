angular.module('IMS8Alert.controllers', [])

.controller('OpeninghourCtrl', function ($scope, $ionicPopup, $ionicModal, $rootScope, $ionicLoading, iAdminServiceClient) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    $scope.headerimg.playercount = $rootScope.playercount;
    $scope.headerimg.alertplayercount = $rootScope.alertplayercount;
    $scope.headerimg.coverUrl = $rootScope.headerCoverUrl;
    $scope.headerimg.logoUrl = $rootScope.headerLogoUrl;
    if (!$scope.headerimg.playercount)
        getLocationAlertInfo(false);
    else
        $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);

    $scope.save24_7 = function (Is24_7) {
        if (!Is24_7) {
            $scope.serviceHour.Is24_7 = true;
            $scope.SaveServiceHour();
        }
        else {
            $scope.serviceHour.Is24_7 = false;
            $scope.SaveServiceHour();
        }
    };

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location ' + $scope.headerimg.locName + ' will be set in Alert mode. This will be applied to ' + $scope.headerimg.playercount + ' media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                    getLocationAlertInfo($scope.alertChecked);
                }
            });
        }
        else {
            $scope.alertChecked = false;
            getLocationAlertInfo(true);
        }
    };

    function getLocationAlertInfo(isSave) {
        var locationAlertDTO = {};
        locationAlertDTO.LocationId = $rootScope.LocationId;
        if (isSave) {
            locationAlertDTO.IsAlert = $scope.alertChecked;
        }
        $ionicLoading.show();
        iAdminServiceClient.location_AlertService(locationAlertDTO, isSave)
        .success(function (data) {
            $ionicLoading.hide();
            if (data) {
                $scope.headerimg.playercount = $rootScope.playercount = data.Location_AlertServiceResult.TotalPlayerCount
                $scope.headerimg.alertplayercount = $rootScope.alertplayercount = data.Location_AlertServiceResult.AlertPlayerCount;
                $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);
            }
        })
      .error(function (error, data) {
          $ionicLoading.hide();
      });
    }

    getLocationServiceHour();

    function getLocationServiceHour() {
        $ionicLoading.show();
        $scope.testHours = [
                                      { day: 'Monday', openTime: '', closeTime: '' },
                                      { day: 'Tuesday', openTime: '', closeTime: '' },
                                     { day: 'Wednesday', openTime: '', closeTime: '' },
                                     { day: 'Thursday', openTime: '', closeTime: '' },
                                      { day: 'Friday', openTime: '', closeTime: '' },
                                     { day: 'Saturday', openTime: '', closeTime: '' },
                                     { day: 'Sunday', openTime: '', closeTime: '' }
        ];
        iAdminServiceClient.getLocationServiceHour($rootScope.LocationId)
            .success(function (data) {
                if (data.Location_LocationServiceHoursGetResult != null) {
                    $scope.serviceHour = data.Location_LocationServiceHoursGetResult;
                    if ($scope.serviceHour.IsMonOpen) {
                        $scope.testHours[0].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.MonOpenTime)).substring(2, 7);
                        $scope.testHours[0].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.MonCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsTueOpen) {
                        $scope.testHours[1].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.TueOpenTime)).substring(2, 7);
                        $scope.testHours[1].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.TueCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsWedOpen) {
                        $scope.testHours[2].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.WedOpenTime)).substring(2, 7);
                        $scope.testHours[2].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.WedCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsThuOpen) {
                        $scope.testHours[3].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.ThuOpenTime)).substring(2, 7);
                        $scope.testHours[3].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.ThuCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsFriOpen) {
                        $scope.testHours[4].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.FriOpenTime)).substring(2, 7);
                        $scope.testHours[4].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.FriCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsSatOpen) {
                        $scope.testHours[5].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.SatOpenTime)).substring(2, 7);
                        $scope.testHours[5].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.SatCloseTime)).substring(2, 7);
                    }
                    if ($scope.serviceHour.IsSunOpen) {
                        $scope.testHours[6].openTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.SunOpenTime)).substring(2, 7);
                        $scope.testHours[6].closeTime = centisecsToSCORM12Duration(ISODurationToCentisec($scope.serviceHour.SunCloseTime)).substring(2, 7);
                    }
                }

                $ionicLoading.hide();

            })
            .error(function (error, data) {
                $ionicLoading.hide();

            });
    }
    $scope.SaveServiceHour = function () {
        if ($scope.time.id == 0) {
            $scope.serviceHour.IsMonOpen = true;
            $scope.serviceHour.MonOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.MonCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }

        if ($scope.time.id == 1) {
            $scope.serviceHour.IsTueOpen = true;
            $scope.serviceHour.TueOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.TueCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        if ($scope.time.id == 2) {
            $scope.serviceHour.IsWedOpen = true;
            $scope.serviceHour.WedOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.WedCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        if ($scope.time.id == 3) {
            $scope.serviceHour.IsThuOpen = true;
            $scope.serviceHour.ThuOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.ThuCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        if ($scope.time.id == 4) {
            $scope.serviceHour.IsFriOpen = true;
            $scope.serviceHour.FriOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.FriCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        if ($scope.time.id == 5) {
            $scope.serviceHour.IsSatOpen = true;
            $scope.serviceHour.SatOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.SatCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        if ($scope.time.id == 6) {
            $scope.serviceHour.IsSunOpen = true;
            $scope.serviceHour.SunOpenTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.openTime.concat(":00")), true);
            $scope.serviceHour.SunCloseTime = centisecsToISODuration(SCORM12DurationToCs($scope.time.closeTime.concat(":00")), true);
        }
        $ionicLoading.show();
        iAdminServiceClient.saveLocationServiceHour($rootScope.LocationId, $scope.serviceHour)
           .success(function (data) {
               $ionicLoading.hide();
               $scope.mdltime.hide();
               if (data.Location_LocationServiceHoursSaveResult != null) {
                   getLocationServiceHour();
               }
           })
           .error(function (error, data) {
               $ionicLoading.hide();
           });


    };

    $ionicModal.fromTemplateUrl('templates/modal/modal-time.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdltime = modal; });
    $scope.time = {};
    $scope.openModalTime = function (hrs, idx) {
        $scope.header = hrs.day;
        $scope.time.openTime = hrs.openTime;
        $scope.time.closeTime = hrs.closeTime;
        $scope.time.id = idx;
        $scope.selectedTime = "";
        $scope.mdltime.show();
    };
    $scope.cancel = function () {
        $scope.mdltime.hide();
    };
    $scope.selectTime = function (type) {
        $scope.timeType = type;
    };

    $scope.$on('modal.shown', function (event, modal) {
        var curr = new Date().getFullYear();
        var opt = { 'time': { preset: 'time' } };
        $('.demo-test-time').scroller('destroy').scroller($.extend(opt['time'], {
            theme: 'default',
            mode: 'scroller',
            display: 'inline',
            animate: 'slidevertical'
        }));
    });
    $scope.$watch('time.selectedTime', function () {
        if ($scope.timeType == 'from')
            $scope.time.openTime = $scope.time.selectedTime;
        else if ($scope.timeType == 'to')
            $scope.time.closeTime = $scope.time.selectedTime;
    });

})

.controller('ChannelsCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicNavBarDelegate, $rootScope, iAdminServiceClient, $ionicLoading) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    $scope.headerimg.playercount = $rootScope.playercount;
    $scope.headerimg.alertplayercount = $rootScope.alertplayercount;
    $scope.headerimg.coverUrl = $rootScope.headerCoverUrl;
    $scope.headerimg.logoUrl = $rootScope.headerLogoUrl;
    if (!$scope.headerimg.playercount)
        getLocationAlertInfo(false);
    else
        $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location ' + $scope.headerimg.locName + ' will be set in Alert mode. This will be applied to ' + $scope.headerimg.playercount + ' media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                    getLocationAlertInfo($scope.alertChecked);
                }
            });
        }
        else {
            $scope.alertChecked = false;
            getLocationAlertInfo(true);
        }
    };

    function getLocationAlertInfo(isSave) {
        var locationAlertDTO = {};
        locationAlertDTO.LocationId = $rootScope.LocationId;
        if (isSave) {
            locationAlertDTO.IsAlert = $scope.alertChecked;
        }
        $ionicLoading.show();
        iAdminServiceClient.location_AlertService(locationAlertDTO, isSave)
        .success(function (data) {
            $ionicLoading.hide();
            if (data) {
                $scope.headerimg.playercount = $rootScope.playercount = data.Location_AlertServiceResult.TotalPlayerCount
                $scope.headerimg.alertplayercount = $rootScope.alertplayercount = data.Location_AlertServiceResult.AlertPlayerCount;
                $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);
            }
        })
      .error(function (error, data) {
          $ionicLoading.hide();
      });
    }

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

})

.controller('ContactDetailCtrl', function ($scope, $state, list, $rootScope, $ionicModal, $ionicPopup, $ionicNavBarDelegate, $ionicLoading, iAdminServiceClient) {


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
        $ionicLoading.show();
        iAdminServiceClient.saveLocationContacts($scope.contact, false)
                   .success(function (data) {
                       $ionicLoading.hide();
                       var t = $scope.item;
                       $scope.$destroy();
                       $scope.mdleditcontact.hide();
                   })
                    .error(function (error, data) {
                        $ionicLoading.hide();

                    });
    };
    $scope.deleteContact = function () {
        if ($scope.contact) {
            $ionicLoading.show();
            iAdminServiceClient.saveLocationContacts($scope.contact, true)
                       .success(function (data) {
                           $ionicLoading.hide();
                           var t = $scope.item;
                           $scope.$destroy();
                           $scope.mdleditcontact.hide();
                           $scope.goBack();
                       })
                        .error(function (error, data) {
                            $ionicLoading.hide();

                        });
        }
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

.controller('ContactCtrl', function ($scope, list, $state, $ionicModal, $ionicPopup, $ionicNavBarDelegate, $rootScope, iAdminServiceClient, $ionicLoading) {
    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    $scope.headerimg.playercount = $rootScope.playercount;
    $scope.headerimg.alertplayercount = $rootScope.alertplayercount;
    $scope.headerimg.coverUrl = $rootScope.headerCoverUrl;
    $scope.headerimg.logoUrl = $rootScope.headerLogoUrl;
    if (!$scope.headerimg.playercount)
        getLocationAlertInfo(false);
    else
        $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location ' + $scope.headerimg.locName + ' will be set in Alert mode. This will be applied to ' + $scope.headerimg.playercount + ' media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                    getLocationAlertInfo($scope.alertChecked);
                }
            });
        }
        else {
            $scope.alertChecked = false;
            getLocationAlertInfo(true);
        }
    };

    function getLocationAlertInfo(isSave) {
        var locationAlertDTO = {};
        locationAlertDTO.LocationId = $rootScope.LocationId;
        if (isSave) {
            locationAlertDTO.IsAlert = $scope.alertChecked;
        }
        $ionicLoading.show();
        iAdminServiceClient.location_AlertService(locationAlertDTO, isSave)
        .success(function (data) {
            $ionicLoading.hide();
            if (data) {
                $scope.headerimg.playercount = $rootScope.playercount = data.Location_AlertServiceResult.TotalPlayerCount
                $scope.headerimg.alertplayercount = $rootScope.alertplayercount = data.Location_AlertServiceResult.AlertPlayerCount;
                $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);
            }
        })
      .error(function (error, data) {
          $ionicLoading.hide();
      });
    }

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
        $scope.contact = {};
        $scope.contact.LocationId = $rootScope.LocationId;
        $scope.contact.LocationName = $rootScope.LocationName;
        $scope.mdleditcontact.show();
    };
    $scope.saveContact = function () {
        $ionicLoading.show();
        iAdminServiceClient.saveLocationContacts($scope.contact, false)
                   .success(function (data) {
                       $ionicLoading.hide();
                       $scope.contacts.push($scope.contact);
                       $scope.mdleditcontact.hide();
                   })
                    .error(function (error, data) {
                        $ionicLoading.hide();

                    });
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

.controller('AddressCtrl', function ($scope, $state, list, $ionicNavBarDelegate, $rootScope, iAdminServiceClient, $ionicModal, $ionicPopup, $ionicLoading) {

    $scope.address = {};
    $scope.visitAddress = $rootScope.visitAddress;
    $scope.invoiceAddress = $rootScope.invoiceAddress;

    $scope.headerimg = {};
    $scope.headerimg.locName = $rootScope.LocationName;
    $scope.headerimg.groupName = $rootScope.groupName;
    $scope.headerimg.playercount = $rootScope.playercount;
    $scope.headerimg.alertplayercount = $rootScope.alertplayercount;
    $scope.headerimg.coverUrl = $rootScope.headerCoverUrl;
    $scope.headerimg.logoUrl = $rootScope.headerLogoUrl;

    if (!$scope.headerimg.playercount)
        getLocationAlertInfo(false);
    else
        $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);

    $scope.showConfirm = function (m) {
        if (!m) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alert Mode',
                template: 'WARNING! Location ' + $scope.headerimg.locName + ' will be set in Alert mode. This will be applied to ' + $scope.headerimg.playercount + ' media players.'
            });
            confirmPopup.then(function (res) {
                if (!res) {
                    $scope.alertChecked = false;
                }
                else {
                    $scope.alertChecked = true;
                    getLocationAlertInfo($scope.alertChecked);
                }
            });
        }
        else {
            $scope.alertChecked = false;
            getLocationAlertInfo(true);
        }
    };

    function getLocationAlertInfo(isSave) {
        var locationAlertDTO = {};
        locationAlertDTO.LocationId = $rootScope.LocationId;
        if (isSave) {
            locationAlertDTO.IsAlert = $scope.alertChecked;
        }
        $ionicLoading.show();
        iAdminServiceClient.location_AlertService(locationAlertDTO, isSave)
        .success(function (data) {
            $ionicLoading.hide();
            if (data) {
                $scope.headerimg.playercount = $rootScope.playercount = data.Location_AlertServiceResult.TotalPlayerCount
                $scope.headerimg.alertplayercount = $rootScope.alertplayercount = data.Location_AlertServiceResult.AlertPlayerCount;
                $scope.alertChecked = ($rootScope.playercount == 0) ? false : (($rootScope.playercount == $rootScope.alertplayercount) ? true : false);
            }
        })
      .error(function (error, data) {
          $ionicLoading.hide();
      });
    }


    $scope.goBack = function () {
        $ionicNavBarDelegate.back();
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
            if ($rootScope.visitAddress)
                $scope.address = $scope.visitAddress;
            else {
                $scope.address.Street = "";
                $scope.address.AddressFrom = "";
                $scope.address.AddressTo = "";
                $scope.address.Country = "";
                $scope.address.State = "";
                $scope.address.Zip = "";
                $scope.address.City = "";
                $scope.address.AddressType = "V";
                $scope.address.LocationId = $rootScope.LocationId;
            }
        }
        else if ($scope.type == "invoice") {
            $scope.header = "Invoice Address";
            if ($rootScope.invoiceAddress)
                $scope.address = $scope.invoiceAddress;
            else {
                $scope.address.Street = "";
                $scope.address.AddressFrom = "";
                $scope.address.AddressTo = "";
                $scope.address.Country = "";
                $scope.address.State = "";
                $scope.address.Zip = "";
                $scope.address.City = "";
                $scope.address.AddressType = "I";
                $scope.address.LocationId = $rootScope.LocationId;
            }
        }
        $ionicLoading.hide();
        $scope.mdladdress.show();
    };
    $scope.saveAddress = function () {
        $ionicLoading.show();
        if ($scope.type == "visit") {
            $scope.visitAddress = $scope.address;
            $rootScope.visitAddress = $scope.visitAddress;
        }
        else if ($scope.type == "invoice") {
            $scope.invoiceAddress = $scope.address;
            $rootScope.invoiceAddress = $scope.invoiceAddress;
        }
        iAdminServiceClient.updateLocationAddresses($scope.visitAddress, $scope.invoiceAddress)
             .success(function (data) {
                 $ionicLoading.hide();
                 $scope.mdladdress.hide();
             })
              .error(function (error, data) {
                  $ionicLoading.hide();

              });
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
                   if (poDetail.CountryName == "USA") {
                       $scope.address.State = poDetail.Region;
                       $scope.address.StateCode = poDetail.RegionCode;
                   }

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
        $scope.mdlcountry.searchText = "";
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
    if ($rootScope.groupName) {
        $scope.selectedgrp = $rootScope.groupName;
        getGroupMember($rootScope.GroupID, $rootScope.CustomerID);
    }
    else
        $scope.selectedgrp = "";
    if ($rootScope.proName) {
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
                           result = _.where(data.User_GetCustomersResult, { Active: "Active" });
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
        $scope.mdlcust.searchText = "";
        $scope.mdlcust.show();

    };
    $scope.applyModalCust = function (itmcust) {
        $scope.selectedcstomer = itmcust.CustomerName;
        if ($rootScope.CustomerID != itmcust.CustomerID) {
            $scope.selectedgrp = $rootScope.groupName = "";
            $rootScope.GroupID ="";
            $scope.selectedpro = $rootScope.proName = "";
            $rootScope.MemberID = "";
            $rootScope.CustomerID = itmcust.CustomerID;
            $rootScope.CustomerName = $scope.selectedcstomer;
            getGroups(itmcust.CustomerID);
        }
        $scope.mdlcust.hide();
    };

    // Model for Group 

    $ionicModal.fromTemplateUrl('templates/modal/modal-group.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlgrp = modal; });
    $scope.openModalGrp = function () {
        $scope.mdlgrp.searchText = "";
        $scope.mdlgrp.show();
    };
    $scope.applyModalGrp = function (itmgrp) {
        if ($rootScope.GroupID != itmgrp.GroupId) {
            $scope.selectedpro = $rootScope.proName = "";
            $rootScope.MemberID = "";
            $scope.selectedgrp = itmgrp.Name;
            $rootScope.GroupID = itmgrp.GroupId;
            $rootScope.groupName = $scope.selectedgrp;
            getGroupMember(itmgrp.GroupId, $rootScope.CustomerID);
        }
        $scope.mdlgrp.hide();
    };
    // Model for Profile 

    $ionicModal.fromTemplateUrl('templates/modal/modal-profile.html', {
        scope: $scope,
        animation: 'slide-left-right',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
    }).then(function (modal) { $scope.mdlpro = modal; });
    $scope.openModalPro = function () {
        $scope.mdlpro.searchText = "";
        $scope.mdlpro.show();
    };
    $scope.applyModalPro = function (itmpro) {
        if ($rootScope.MemberID != itmpro.GroupMemberId) {
            $scope.selectedpro = itmpro.Name;
            $rootScope.proName = itmpro.Name;
            $rootScope.MemberID = itmpro.GroupMemberId;
        }
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
    if ($window.sessionStorage.token)
        $state.go("page.home");

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
    if ($rootScope.playercount) {
        delete $rootScope.playercount;
        delete $rootScope.alertplayercount;
    }
    getLocationAddresses($rootScope.CustomerID, $rootScope.groupID, $rootScope.MemberID);
    function getLocationAddresses(customerId, groupId, memberId) {
        $ionicLoading.show();
        iAdminServiceClient.getLocationAddresses(customerId, groupId, memberId, 0)
            .success(function (data) {
                var result = data.Location_GetLocationAddressesResult;
                $ionicLoading.hide();
                if (result) {
                    $scope.allLocations = result;
                    $scope.locations = _.where($scope.allLocations, { AddressType: 'Visit' });
                }
                $ionicLoading.hide();
            })
         .error(function (error, data) {
             $ionicLoading.hide();
         });
    }

    $scope.doNext = function () {
        if ($scope.selectedId) {
            $rootScope.LocationId = $scope.selectedId;
            $rootScope.visitAddress = _.where($scope.allLocations, { AddressType: 'Visit', LocationId: $scope.selectedId })[0];
            $rootScope.invoiceAddress = _.where($scope.allLocations, { AddressType: 'Invoice', LocationId: $scope.selectedId })[0];
            $rootScope.headerCoverUrl = getThumb($scope.selectedId, "LOCATIONCOVER", 1);
            $rootScope.headerLogoUrl = getThumb($scope.selectedId, "LOCATIONLOGO", 1);
            $state.go("tab.address");
        }

    }

    $scope.selectlocation = function (loc, idx) {
        if ($scope.selectedLocationIndex != idx) {
            $scope.selectedLocationIndex = idx;
            $scope.selectedId = loc.LocationId;
            $rootScope.LocationName = loc.LocationName;
        }
    }
});