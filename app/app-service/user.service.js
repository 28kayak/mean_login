/**
 * Created by kaya on 3/28/2017.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .factory('UserService', Service);
    function Service() {
        var service = {};
        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;
    }//service
    function GetCurrent() {
        return $http.get('/api/users/current').then(handleSuccess, handleError);
    }
    function GetAll() {
        return $http.get('/api/users/').then(handleSuccess, handleError);
    }//getAll
    function GetById(_id) {
        return $http.get('/api/users' + _id).then(handleSuccess, handleError);
    }
    function GetByUsername(username) {
        return $http.get('/api/users' + username).then(handleSuccess, handleError);
    }
    function Create (user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError);
    }
    function Update(user){
        return $http.put('/api/users' + user._id, user).then(handleSuccess, handleError);
    }
    function Delete(_id){
        return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
    }
    //private functions
    function handleSuccess()
    {
        return res.data;
    }
    function handleError()
    {
        return $q.reject(res.data);
    }
})();