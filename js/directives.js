﻿jqLite = angular.element;

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
        scope: false,
        template: ' <div class="bar bar-subheader " style="padding: 5px 0px 0px; top:0px;" ng-class="{alertheader:alertChecked ,alertheaderOff:!alertChecked}">' +
'<a class="ion-information-circled" style="font-size: 20px; margin-left: 10px;"><span class="alertHeading"> Alert Mode ({{headerimg.alertplayercount}} of {{headerimg.playercount}})</span></a>' +
' <span class="itemValue">' +
'      <dbr-toggle id="cbAlertMode" ng-model="alertChecked" data-on="ON" data-off="OFF" data-trackcss="white" data-handlecss="handleWhite" ng-change="showConfirm(alertChecked)"></dbr-toggle> ' +
' </span>' +
'<div id="coverImage" class="row addrimg" style="margin-top: 5px; background-repeat: no-repeat; background: url({{headerimg.coverUrl}});">' +
'<div id="logoImage" class="circle " style="background-repeat: no-repeat; background: url({{headerimg.logoUrl}});"></div>' +
' <div class="coltext " style="margin-top: 1.5em;">' +
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
 .directive('fallbackSrc', function () {
     var missingDefault = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEA/9sAQwAEAgMDAwIEAwMDBAQEBAUJBgUFBQULCAgGCQ0LDQ0NCwwMDhAUEQ4PEw8MDBIYEhMVFhcXFw4RGRsZFhoUFhcW/9sAQwEEBAQFBQUKBgYKFg8MDxYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+ggKcBQBRQAUAZpQKUUAFOAxRSgUAIBThQBTqAAClAoApwFACU4CilAoAQCnYoxTsUAJilpcUtACYpaXFLQAmKXFLiloAbilxTsUuKAG0YNOowaAExS4FLilxQA2inYooAbRg07BpcGgBmDRg0/FGKAGYNFPxSYNADaKdg0UANxSYp+BSYoAbikwafikoAbikxT6TFADMUYp2KMUAR4oxT8UmKAGYpMU/FJigCPFJin4pMUAMpCKfSEUAMIppFSEU2gBhFIRTyKaRQAykIp9NoAaRmm08ikNADaQilooAbiilxRQAtKBSAZpwoABTqKUCgAApwFAFKKAACnAUU4CgBAKUClApQKAClApaUCgBMU7FGKdigBMUuKUClxQAmKXFLiloATFLS4paAG4NLinYpcUANpcUtLigBuKXAp2KKAG0YNOooATFGKWigBMUYpaKAExRilooATBpMGnUUANowKdRigBmKTBp+KMUAMxSYp9JigBlGKdijFADMUmKdiigBmKTFPxSYoAjxSYp+KTFADKQin00igBpFNxTyKQigCMikIp5FIRQAwim08ikNAEZGKQin00jFADTTaeRSEUANooooAdTqAMUoFAABTgKAKUUAAFOopwoAAKUCgCnAUAAFLQBTqADGKUClApQKAEApwFFOAoATFLRinAUAJilpcUuKAExS0uKWgBMUuKKKACijBpcUAJRTqMGgBMGjFOxRigBuKXAp2BRigBuBRgU6igBuBSYp9GBQAzFGKfgUmKAGYNFPxSYoAbRTsUmKAEpMUtFADcUYp1GKAI8UYp+KTFAEeKMU7FJigBmKQin0hFADKaRipCKaaAGEUhFPIpCKAI6aRUlNNADCKQjNPIppFADCKbUhFNNAEZGKQinn0ptADaKXFFACgU4CgU4UAAp1ApwFAAKUChRTgKAAClAzQBmnAUAFOFAFOAoAQClApQKWgApQKUClAoAQCnYop2KAExS0UUAFFLiloATFLS4paAExS4pcUuKAG0uKXBpcUANxS4FOxRigBtFOowaAG0U7BowaAG0U7BowaAG4oxTqMCgBmKTBp+KMUAMpMU+kxQAzBoxTsUYoAZikp+KSgBtGKXFJQA0ikxT6QigBlNIqTFNIoAaRTaeRSUARkUhFPIpCKAGEZptPIpCKAIzSEU+mmgBjCmkU8jFIwoAYRmmmnsKawoAZRTqKAHAUqihRTgKABR3pyikApwoAUClAoFOoAKcBQKcBQAAYpQKAKWgApwFFOAxQAgFOAoApaACiilAoAAKWgCnUAJilxS4paAExS4pcUuKAExS0uKWgBuDS4p2KMUAJgUU6igBuDS4pcGlwaAG4oxTsUYoAbijBp2KTBoAbg0U7BooAbgUmKfikxQAzFGKdg0YoAZikxT8UlADMUmKfikoAZikxTyKQigCOinUhFACYzTadRQAwimkU8jFIRQAymkYp5FJQAwimkU8jFIRQAwjNNNPYU0igBh9KaakIppoAjPFNIqQ02gBmKKWigBwp1ApVoAUU4UiinKKAFHFOApFFOUUACinAUgFOoAKdQBTgMUAAGKUCgCloAKKAM07FAAKUClAxSgUAJinUAU7FACYpaXFLQAYoxTsUUAJilpcUtADcGlxTsUYoATFGDTqMGgBMGjFOxRigBuKMU7FGKAG4oxTsUYoAZg0U/FJg0ANxSYp+KTFADKKdg0YoAZikp+KSgBmKSn4pKAIyKQin4pCKAGU0ipKaRigBhFJTyKQigBtNIxTqKAGEU0inkYpCKAGU008ikoAjIxSMKeaaaAGMKawp5ppFADGFNanmmmgBtFLiigBRThQKcKAAU4UCnCgAFOFApwoAKcBSKKcooAAKcooApaACgDNFOHpQAU4UClAoAAKcBQBSgZoAAKcBRinAUAIBS0YzTsUAJilpcUtACYpaXFLigBMUuKXFLigBuKXFLg0uKAG4pcCnYoxQA3AowKdRQA3ApMU+jAoAZijBp2KMUAMpMU/FGKAI8UYp+KTFADMUmKfikxQBHiinYpMUAMxSEU+kIoAYRTSKkIptADCKaRTzSEUAMIzTaeRSEUANppp1FAEZFIwp9NNADSKaacaRhQAw0009qa1ADDTTT29aa1ADKKdiigBVpy0lOoAVactIKcKAFWlFFOFAAKcKBThQAUUUq0AKKcBikUU5RQAAU4ChRSgZoAUClAoAp1ABSgUAUoFAAKcBRTgKAEApaUCloATFLilxS4oATFLS4pcUAJijFOxS4oAbiinUYNADaKdg0YNADaKdg0YNADcCkxT8UmKAGYNGKfikoAZikp+KSgBmKTFPxSEUAR4pCKeRSEUAMptSEZptADCKQinEYpCKAGEU01IRTaAIyKRhT6aaAGMKSnGmmgANNNOpGoAYabT2prUAMNNNPamtQAw0009qa1ADKKdRQAq05aSnCgBVpy0gp1ACrTlpKcKAFWloooAVaUUU4UAApwoFOFAAKcPSgU4CgApQKFFKBQAoFKKBTgKAClApQKUCgAApaAKdQAmKXFLilxQAYoxTsUYoATFLilxS0ANwaXBpaKAExRilooATFJg06igBtGKdRigBmKSn4pKAGYpKfikoAZikxT8UhFAEZFIRTzTSKAGEUhp5FNIoAZTSMVIaaaAGEUhFOpGFADDTTT2pretADDTae1NagBlFK1JQA00009qa1ADKaae1IaAIzTTUjUxqAGUU6igBVpy0gp1ACrTlpKcKAFWnLSU6gApVpKdQAq05aQU4UAKtOX1pBThQAq0o5opwoABTqBThQAU4CkApwFAABTgKAKUDNAABTqKcBQAgFLilApaADFFFFABRS4paAG4NLinYNGKAG4oxTsUYoAbijBp2KMUAMop2DRigBtFLikoATFJTqKAGEU0inkUhFADCKaakIzTaAGEU0inkU0jFADGFIRTiKRhQAwim09qa3rQAw001IaaaAIzTTUhppoAjNNNSNTWoAbTTTqRqAGU2ntTWoAYaaae1NagBlFOxRQALT1pq09elAAKetNWnrQAq0tA6UUAKtOWkFOFACrTlpBThQA5actNFOoAVactJTqAFWnLSU4UAKopQKKdQACnUCnCgAFKBQBS0AFFFOAoAQClxSgUuKAExS4p2KMUAJijFOxS4FADcCjAp1FADcCkxT6MUAMxSU/FJQAzFJT8UlADCKSnEUhFACUhFLRQAwikIp5FNYUAMNNp7CmtQAymmntSNQBGaaakamtQBHSNTmpDQAxqYakNNNAEZppp7U1qAGUUrUlADTTTT2prUAMpppx60jUAMooPWigB1Opq9acOtADqcKRactAC0L1opVoActOWkXpTh0oAVactIKcKAFWnLSU4UAKtOWkpwoAVactIKcKAFWnLSCnCgBVpyikFOoAKKKcKACnAUAUoFAABS4pQKWgAxRinYoxQAmKWnYooAbRg07BpcGgBlGKdg0UAMxSU/FJQAzFJTyKQigCMikIp9NIxQAwikp7CmsKAEppp1BoAjNNNSGmmgCM001IaaaAIzTTUhpjUAMNNp7U1qAGNTTT2prUAMNNp7U1qAGGm09qYetAA3SmNT6bQAxqa1PNNoAbRRRQAq05aRelOXpQAq09elNHSnUAFOFNFOHWgB1OHWkWnLQAq9aetNWnLQAq9aetNWnLQA5actIOlOFACrTlpBThQA5acKaKcKAHCiiigBVpy0gpwoAVRTgKQU4UAAFOFApwoAAKMUoFKBQAYowadijBoATFGKdijFADcGkp+KTFADMUlPxSUAMIpCKeRTWFADCKbTyKQigCM001IaaaAIzRTjTaAEam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I4rqFUKoVRgKMAVy0IuI33xrIrDoQDU/2i//AOek/wCtAHR0VzouL7/npN+tL599/wA9Jv1oA6Giue8++/56TfrR59//AM9Jv1oA6Giue8++/wCek360faL7/npN+tAHQ1n69aebD56D54xz7is37Rf/APPSb9aabi//AOek/wCtADdN/wCQjD/10H861PFH/IPT/rqP5GszTo5BqEJMbf6wZ+WtPxV/yD0/66j+RoA58000401qAGmm0rU1qAENNPSlamtQAlDdKKRqAGtTWpzUw9aAEamN1pxptADTTacelNbpQA09KaelK1NbpQAjdKY1OamtQA1qa3WnN1ph60ANPWiig9KAGnpTW6U5ulMagBKKKKAAU4dKYvSnLQA+nU1elOHSgAXrT1plOFAD1py0wdaetAD16U4dKYtOWgB46U4UxactAD6cKYtPFADh1p60wU4UAPWnLTKdQA6lWkooAetOWmU4UAPWnKaYKcDQA9TXQWeqWcdnFG0jbljUH5T1ArngaUGgDpf7Wsf+erf98Gl/tay/56N/3ya5oGnZoA6P+1bL/no3/fJo/tWy/wCejf8AfJrnc0uaAOi/tSz/AOejf98mj+1LP/no3/fJrncmjJoA6L+1LP8A56N/3yaT+1bL/no3/fJrnqM0AdD/AGrZf89G/wC+TSf2tY/89G/75Nc7mgmgDov7Wsf+ejf98GqOvX9tc2axwuSwkBOVI4wf8ayc00mgAJpppSaaxoAQ000rGmtQAhptK1JQAU005qY1ACU00rU1qAEPSmNTmprUANamtSt1ppoARqa1LTT1oARutMPWnU00ANpppx6U1ulADaRulLSNQA1qa1ObrTD1oAKKa3WigBVpy0wdadQA9actMHWnrQAtOHSm0q0APFOFMWnLQA8U5etNFOFADqcOtNpwoActPWmCnCgB605aYKdQA9actMp1AD1pabTqAFU0oNNpVNADwadTAaUGgCQGlBplOBoAeDS5pmaXNAD80uaZmjNAD80ZpuRRmgB2aTNJkUmaAFzRmm5ozQAE0hNJmkJoACaQmgmm0ABNNNBNNJoAKKKRjQAhpppWprUAIaaaVqa1ACGmmlamtQAhpp6UrU1qAEpp6UrU1qAEbpTGpzUxqAEamtSmm0AFNPWnU00ANNNpx6U00ANooooABTqYtOWgB4pwpi05aAH0Ui0t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";
     return {
         restrict: 'A',
         link: function (scope, element, attr) {
             element.on('error', function () {
                 element[0].src = attr.fallbackSrc ? attr.fallbackSrc : missingDefault;
             });
         }
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
}
]).directive('camera', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                navigator.camera.getPicture(function (imageURI) {
                    scope.$apply(function () {
                        ctrl.$setViewValue(imageURI);
                    });
                }, function (err) {
                    ctrl.$setValidity('error', false);
                }, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1000,
                    targetHeight: 1000,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                })
            });
        }
    };
});