/**
 * Created by kaya on 3/28/2017.
 */
(function () {

    'use strict';
    angular
        .module('app')
        .controller('FlashService', Service);

    function Service($rootScope) {
        var service = {};
        service.Success = Success;
        service.Error = Error;
        initService();
        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            } );//$on
            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if(flash)
                {
                    if(!flash.keepAfterLocationChange)
                    {
                        delete $rootScope.flash;
                    }else
                    {
                        //only keep a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }

            }

        }//init service
        function Success(message,keepAfterLocationChange) {
                $rootScope.flash = {
                    message: message,
                    type : 'success',
                    keepAfterLocationChange : keepAfterLocationChange
                };

        }//success
        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: "danger",
                keepAfterLocationChange : keepAfterLocationChange
            };

        }
    }//service
})();//end