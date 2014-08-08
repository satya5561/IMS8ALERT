jqLite = angular.element;

function forEach(obj, iterator, context) {
    var key;
    if (obj) {
        if (angular.isFunction(obj)) {
            for (key in obj) {
                // Need to check if hasOwnProperty exists,
                // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                    iterator.call(context, obj[key], key);
                }
            }
        } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context);
        } else if (angular.isArray(obj)) {
            for (key = 0; key < obj.length; key++)
                iterator.call(context, obj[key], key);
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(context, obj[key], key);
                }
            }
        }
    }
    return obj;
}
angular.module('IMS8Alert.directives', [])
.directive('ims8Togale', function () {
    var directive = {};

    directive.restrict = 'E';

    directive.template = "User : {{user.firstName}} {{user.lastName}}";

    directive.scope = {
        user: "=user"
    }

    return directive;
})
.directive('imgHeader', function () {
    return {
        restrict: 'E',
        scope:false,
              template: ' <div class="bar bar-subheader " style="padding: 5px 0px 0px;" ng-class="{alertheader:alertChecked ,alertheaderOff:!alertChecked}">' +
   '<a class="button button-icon icon ion-information-circled title-left"><span class="alertHeading"> Alert Mode ({{headerimg.alertplayercount}} of {{headerimg.playercount}})</span></a>' +
   ' <span class="itemValue">' +
  '      <dbr-toggle id="cbAlertMode" ng-model="alertChecked" ng-checked="false" data-on="ON" data-off="OFF" data-trackcss="white" data-handlecss="handleWhite" ng-change="showConfirm(alertChecked)"></dbr-toggle> ' +
   ' </span>' +
   '<div class="row addrimg" style="margin-top: 5px;">' +
   '<div class="circle "></div>' +
   ' <div class="coltext " style="margin-top: 10px;">' +
   '  <div style="font-size: 20px; font-weight: bolder;">{{headerimg.locName}}</div>' +
   ' <div style="font-size: small;">NOLETV001SHD</div>' +
   '<div><span style="font-weight: bold;">Group: </span><span>{{headerimg.groupName}}</span></div>' +
   ' <div><span style="font-weight: bold;">Region: </span><span>South</span></div>' +
   ' <div><span style="font-weight: bold;">Store type: </span><span>MegaStore</span></div>' +
   ' </div>' +
       '</div>' +
  '</div>'



    };
})

.directive('inputevent', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            'returnClose': '=',
            'onReturn': '&',
            'onFocus': '&',
            'onBlur': '&'
        },
        link: function (scope, element, attr) {
            element.bind('focus', function (e) {
                if (scope.onFocus) {
                    $timeout(function () {
                        scope.onFocus();
                    });
                }
            });
            element.bind('blur', function (e) {
                if (scope.onBlur) {
                    $timeout(function () {
                        scope.onBlur();
                    });
                }
            });
            element.bind('keydown', function (e) {
                if (e.which == 13) {
                    if (scope.returnClose) element[0].blur();
                    if (scope.onReturn) {
                        $timeout(function () {
                            scope.onReturn();
                        });
                    }
                }
            });
        }
    }
})
.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]).value('version', 'iAlert v 1.1.0.8 Databeat.Net 2014')
.directive('dbCheckbox', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '?ngModel',
        transclude: true,
        template: '<label class="item item-radio">' +
             '<input type="checkbox">' +
            '<div class="item-content disable-pointer-events listcol" ng-transclude></div>' +
                      '<div class="radio-track"></div>' +
                      '<i class=" radio-icon ion-ios7-checkmark-empty"></i>' +
                  '</label>',
        compile: function (element, attr) {
            var input = element.find('input');
            forEach({
                'name': attr.name,
                'ng-value': attr.ngValue,
                'ng-model': attr.ngModel,
                'ng-checked': attr.ngChecked,
                'ng-disabled': attr.ngDisabled,
                'ng-true-value': attr.ngTrueValue,
                'ng-false-value': attr.ngFalseValue,
                'ng-change': attr.ngChange
            }, function (value, name) {
                if (angular.isDefined(value)) {
                    input.attr(name, value);
                }
            });
        }

    };
}).directive('dbrToggle', [
  '$ionicGesture',
  '$timeout',
function ($ionicGesture, $timeout) {

    return {
        restrict: 'E',
        replace: true,
        require: '?ngModel',
        scope: {
            ngModel: '=?',
            ngValue: '=?',
            ngChecked: '=?',
            ngChange: '&',
            ngDisabled: '=?'
        },
        transclude: true,
        template: '<div><label class="toggle">' +
                      '<input type="checkbox" ng-model="ngModel" ng-value="ngValue" ng-change="ngChange()" ng-disabled="ngDisabled">' +
                      '<div class="track ">' +
                        '<div class="pull-left handleOn">ON</div>' +
                    '<div class="pull-right handleOf">Off</div>' +
                    '<div class="handle "></div>' +
                      '</div>' +
                    '</label></div>',
        compile: function (element, attr) {
            var input = element.find('input');
            if (attr.name) input.attr('name', attr.name);
            if (attr.ngChecked) input.attr('ng-checked', 'ngChecked');
            if (attr.ngTrueValue) input.attr('ng-true-value', attr.ngTrueValue);
            if (attr.ngFalseValue) input.attr('ng-false-value', attr.ngFalseValue);
            if (attr.toggleClass) {
                element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
            }

            return function ($scope, $element, $attr) {
                var el, checkbox, track, handle, on_label, off_label;				// Text to be displayed when checked

                el = $element[0].getElementsByTagName('label')[0];
                checkbox = el.children[0];
                track = el.children[1];
                handle = track.children[2];
                on_label = track.children[0];
                off_label = track.children[1];
                var ngModelController = jqLite(checkbox).controller('ngModel');
                if ($attr.trackcss)
                    jqLite(track).addClass($attr.trackcss);

                if ($attr.handlecss)
                    jqLite(handle).addClass($attr.handlecss);

                if ($attr.on)
                    on_label.innerHTML = $attr.on;

                if ($attr.off)
                    off_label.innerHTML = $attr.off;

                $scope.toggle = new ionic.views.Toggle({
                    el: el,
                    track: track,
                    checkbox: checkbox,
                    handle: handle,
                    onChange: function () {
                        if (checkbox.checked) {
                            ngModelController.$setViewValue(true);
                        } else {
                            ngModelController.$setViewValue(false);
                        }
                        $scope.$apply();
                    }
                });

                $scope.$on('$destroy', function () {
                    $scope.toggle.destroy();
                });
            };
        }

    };
}]);;