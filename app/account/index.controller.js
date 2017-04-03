/**
 * Created by kaya on 3/28/2017.
 */
(function () {
    'use strict';
    //strict mode avoids creations of variables caused by spelling miss
    // '' avoid NaN assigning.....etc
    angular
        .module('app')
        .controller('Account.IndexController', Controller);
    function Controller($window, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        initController();

        function initController() {
            //get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }//initController
        function saveUser() {
            UserService.Update(vm.user).then(function () {
                FlashService.Success('User updated');
            })//then
            .catch(function (error) {
                FlashService.Error(error);

            });//catch
        }//saveUser
        function deleteUser(){
            UserService.Delete(vm.user._id)
                .then(function () {
                    //log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }//deleteUser
    }//function controller

})();