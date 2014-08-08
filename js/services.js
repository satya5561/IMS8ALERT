angular.module('IMS8Alert.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('list', function () {
    var states = [
        { id: 0, name: 'state-Scruff McGruff' },
        { id: 1, name: 'state-G.I. Joe' },
        { id: 2, name: 'state-Miss Frizzle' },
        { id: 3, name: 'state-Ash Ketchum' }
    ];
    var roles = [
{ id: 0, name: "Contact", checked: "false" },
{ id: 1, name: "Local Editor", checked: "false" },
{ id: 2, name: "Local Admin", checked: "false" },
{ id: 3, name: "Alert", checked: "false" },
    ];
    var id = "";
    return {
       
        allStates: function () {
            return states;
        },
        get: function (stateId) {
            // Simple index lookup
            return states[stateId];
        },
        allRoles: function () {
            return roles;
        },
    }
})
.factory('iAdminServiceClient', function ($http, $window) {
    var token = ($window.sessionStorage.token) ? $window.sessionStorage.token : -1;
    var urlBase;
    var jsonParam;
    var iAdminServiceClient = {};

    function isValidToken(token) {
        if (token < 0 || token == false || token != $window.sessionStorage.token) {
            token = setToken();
        }
        return (token > 0) ? true : false;
    }
    function setToken() {
        token = ($window.sessionStorage.token) ? $window.sessionStorage.token : -1;
        return token;
    };

    iAdminServiceClient.authorize = function (userinfo) {
        jsonParam = JSON.stringify({ username: userinfo.username, password: userinfo.password });
        urlBase = baseURL + "db_rad_authorize2";
        return $.ajax({
            type: "POST",
            url: urlBase,
            crossDomain: true,
            data: jsonParam,
            dataType: "json",
            contentType: "application/json"
        });

    };
    iAdminServiceClient.getCustomers = function () {
        if (isValidToken(token)) {
            urlBase = baseURL + "user_getcustomers?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.getGroups = function (customerId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getgroups?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, customerId: customerId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.groupMembersGet = function (groupId, customerId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getgroupmembers?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, groupId: groupId, customerId: customerId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.getLocationAddresses = function (customerId, groupId, memberId, locationId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getlocationaddresses?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, customerId: customerId, groupId: groupId, memberId: memberId, locationId: locationId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.lookupsGet = function (lookupType) {
        urlBase = baseURL + "location_lookupsget?nc=" + Math.random();
        jsonParam = JSON.stringify({ lookupType: lookupType });
        return $.ajax({
            type: "POST",
            url: urlBase,
            crossDomain: true,
            data: jsonParam,
            dataType: "json",
            contentType: "application/json"
        });
    };
    iAdminServiceClient.getPODetail = function (zipCode, countryId) {
        urlBase = baseURL + "user_getpocodedetail?nc=" + Math.random();
        jsonParam = JSON.stringify({ zipCode: zipCode, countryId: countryId });
        return $.ajax({
            type: "POST",
            url: urlBase,
            crossDomain: true,
            data: jsonParam,
            dataType: "json",
            contentType: "application/json"
        });
    };
    iAdminServiceClient.getLocationContacts = function (customerId, groupId, memberId, locationId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getlocationcontacts?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, customerId: customerId, groupId: groupId, memberId: memberId, locationId: locationId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.getLocationMplayerList = function (locationId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_locationplayersget?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, locationId: locationId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.updateLocationAddresses = function (visitAddress,invoiceAddress) {
        if (isValidToken(token)) {
            urlBase = baseURL + "Location_UpdateLocationAddress?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, invoiceAddress: invoiceAddress, visitAddress: visitAddress });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.saveLocationContacts = function (contact, doDelete) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_savelocationcontact?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, contact: contact, doDelete: doDelete });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.getLocationServiceHour = function (locationId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_locationservicehoursget?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, locationId: locationId });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.location_AlertService = function (locationAlertDTO, isSave) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_alertservice?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, locationAlertDTO: locationAlertDTO, isSave: isSave });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    iAdminServiceClient.saveLocationServiceHour = function (locationId, serviceHour) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_locationservicehourssave?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token, locationId: locationId, serviceHour: serviceHour });
            return $.ajax({
                type: "POST",
                url: urlBase,
                crossDomain: true,
                data: jsonParam,
                dataType: "json",
                contentType: "application/json"
            });
        }
    };
    return iAdminServiceClient;
});