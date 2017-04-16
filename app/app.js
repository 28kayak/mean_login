/**
 * Created by kaya on 3/28/2017.
 */
(function () {
    'use strict';
    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        //default route
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: {activeTab: 'home'}

            })//state 'home'
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: {activeTab: 'account'}
            });//state  'account'
    }//config
    function run($http, $rootScope, $window) {
        //add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer' + $window.jwtToken;
        //update active tag on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }//run
    //manually bootstarp angular after the JWT token is retrieved from the server
    $(function () {
        //get JWT token from server
        $.get('/app/token', function(token) {
            window.jwtToken = token;
            angular.bootstrap(document, ['app']);
        });//$.get
    });//$(function....)

})();//function