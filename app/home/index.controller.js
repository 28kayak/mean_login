/**
 * Created by kaya on 3/28/2017.
 */
/** *
 * home index controller is the default controller for the home section
 * it gets the current user and makes it available to the view
 */

(function () {
    'use strict';
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService) {
        var vm = this;
        vm.user = unll;
        initController();
    }//Controller
    function initController() {
        //get current user
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }//init Controller
})();//function