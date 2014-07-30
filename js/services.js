angular.module('IMS8Alert.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('list', function () {

    var customers = [
      { id: 0, name: 'Scruff McGruff' },
      { id: 1, name: 'G.I. Joe' },
      { id: 2, name: 'Miss Frizzle' },
      { id: 3, name: 'Ash Ketchum' }
    ];
    var profiles = [
      { id: 0, name: 'member-Scruff McGruff' },
      { id: 1, name: 'member-G.I. Joe' },
      { id: 2, name: 'member-Miss Frizzle' },
      { id: 3, name: 'member-Ash Ketchum' }
    ];
    var groups = [
        { id: 0, name: 'groups-Scruff McGruff' },
        { id: 1, name: 'groups-G.I. Joe' },
        { id: 2, name: 'groups-Miss Frizzle' },
        { id: 3, name: 'groups-Ash Ketchum' }
    ];
    var languages = [
    { id: 0, name: 'English' },
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'Japanese' },
    { id: 3, name: 'Norwegian' }
    ];
    var countries = [
  { id: 0, name: 'country-Scruff McGruff' },
  { id: 1, name: 'country-G.I. Joe' },
  { id: 2, name: 'country-Miss Frizzle' },
  { id: 3, name: 'country-Ash Ketchum' }
    ];
    var states = [
        { id: 0, name: 'state-Scruff McGruff' },
        { id: 1, name: 'state-G.I. Joe' },
        { id: 2, name: 'state-Miss Frizzle' },
        { id: 3, name: 'state-Ash Ketchum' }
    ];
    var contacts = [
    { id: 0, name: 'Robert Mitchell', phone: '+9112024568', email: "robm@ashtbit.com", position: 'Store manager', role: "Contact" },
    { id: 1, name: 'Marlon Griffith', phone: '+9256024568', email: "mgr@ashtbit.com", position: 'Customer manager', role: "Local Editor" },
    { id: 2, name: 'Arnold', phone: '+9132524568', email: "ar@ashtbit.com", position: 'Sr. manager', role: "Local Admin" },
    { id: 3, name: 'Rex Harper', phone: '+9198124568', email: "rh@ashtbit.com", position: 'HR manager', role: "Alert" },
    ];
    var locations = [
   { id: 1, name: 'Elgiganten Backebol', visitstreet: "M.M. Street", visitcity: "Oslo", visitzip: 563, visitstate: "Wyoming", visitcountry: "USA", invoicestreet: "I.J. Street", invoicecity: "invoiceOslo", invoicezip: 123, invoicestate: "Wyoming", invoicecountry: "USA" },
   { id: 2, name: 'Marlon Griffith', visitstreet: "M.H. Street", visitcity: "Canada", visitzip: 5689, visitstate: "Sydney", visitcountry: "Australia", invoicestreet: "I.L. Street", invoicecity: "invoiceOslo", invoicezip: 125, invoicestate: "Sydney", invoicecountry: "Australia" },
   { id: 3, name: 'Arnold Mitchell', visitstreet: "M.P. Street", visitcity: "Lucknow", visitzip: 246, visitstate: "Westros", visitcountry: "USA", invoicestreet: "I.K. Street", invoicecity: "invoiceOslo", invoicezip: 124, invoicestate: "Bombay", invoicecountry: "India" },
   { id: 4, name: 'Rex Harper', visitstreet: "M.S. Street", visitcity: "Ohio", visitzip: 563, visitstate: "Oslo", visitcountry: "Norway", invoicestreet: "I.P. Street", invoicecity: "invoiceOslo", invoicezip: 126, invoicestate: "Westros", invoicecountry: "USA" },
   { id: 5, name: 'Scruff Ketchum', visitstreet: "M.G. Street", visitcity: "Delhi", visitzip: 563, visitstate: "Bombay", visitcountry: "India", invoicestreet: "I.M. Street", invoicecity: "invoiceOslo", invoicezip: 129, invoicestate: "Oslo", invoicecountry: "Norway" },
    ];
    var roles = [
  { id: 0, name: "Contact", checked: "false" },
  { id: 1, name: "Local Editor", checked: "false" },
  { id: 2, name: "Local Admin", checked: "false" },
  { id: 3, name: "Alert", checked: "false" },
    ];
    var channels = [
 { id: 0, name: 'ELTV Norge', description: 'Remembrance', player: "NOELTV0034D" },
 { id: 1, name: 'Movie Trailors', description: 'Lost Control', player: "NOELTV0034E" },
 { id: 2, name: 'Advertise', description: 'Joy of the Emptiness', player: "NOELTV0042G" },
 { id: 3, name: 'News', description: 'Current stories', player: "NOELTV0054N" },
    ];
    var id = "";
    return {
        allLocations: function () {
            return locations;
        },
        getlocation: function (locationId) {
            
            return locations[locationId-1];
        },
        setlocation: function (location) {
            for (i in locations) {
                if (locations[i].id == location.id) {
                    locations[i] = location;
                }
            }
            
        },
        getid: function () {
           
            return id;
        },
        setid: function (locationId) {
           
            id= locationId;
        },
        allCustomers: function () {
            return customers;
        },
        get: function (customerId) {
            // Simple index lookup
            return customers[customerId];
        },

        allProfiles: function () {
            return profiles;
        },
        get: function (profileId) {
            // Simple index lookup
            return profiles[profileId];
        },

        allGroups: function () {
            return groups;
        },
        get: function (groupId) {
            // Simple index lookup
            return groups[groupId];
        },

        allLanguages: function () {
            return languages;
        },
        get: function (languageId) {
            // Simple index lookup
            return languages[languageId];
        },

        allStates: function () {
            return states;
        },
        get: function (stateId) {
            // Simple index lookup
            return states[stateId];
        },

        allCountries: function () {
            return countries;
        },
        get: function (countryId) {
            // Simple index lookup
            return countries[countryId];
        },

        allContacts: function () {
            return contacts;
        },
        getContact: function (contactId) {

            return contacts[contactId];
        },
        allRoles: function () {
            return roles;
        },
        allChannels: function () {
            return channels;
        },
    }
})
.factory('iAdminServiceClient', function ( $http, $window) {
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
        urlBase = baseURL + "db_rad_authorize2?nc=" + Math.random();
        return $http({
            url: urlBase,
            data: jsonParam,
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
    };
    iAdminServiceClient.getCustomers = function () {
        if (isValidToken(token)) {
            urlBase = baseURL + "user_getcustomers?nc=" + Math.random();
            jsonParam = JSON.stringify({ authToken: token });
            return $http({
                url: urlBase,
                data: jsonParam,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        }
    };
    iAdminServiceClient.getGroups = function (customerId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getgroups?nc=" + Math.random();
            jsonParam = { authToken: token, customerId: customerId };
            return $http({
                url: urlBase,
                data: jsonParam,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        }
    };
    iAdminServiceClient.groupMembersGet = function (groupId, customerId) {
        if (isValidToken(token)) {
            urlBase = baseURL + "location_getgroupmembers?nc=" + Math.random();
            jsonParam = { authToken: token, groupId: groupId, customerId: customerId };
            return $http({
                url: urlBase,
                data: jsonParam,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        }
    };
    return iAdminServiceClient;
});