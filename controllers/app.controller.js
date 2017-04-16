/**
 * Created by kaya on 3/28/2017.
 */

/**
 * app.controller.js is an express application which the express app controller controls access to the angular client-side application files.

 */


//import express library
var express = require('express');
var router  = express.Router();

//use session auth to secure the angular app files
router.use('/', function(req,res, next){
    if(req.path !== '/login' && !req.session.token)
    {
        return res.redirect('/login?returnUrl='+encodeURIComponent('/app' + req.path));
    }
    next();
});
//make JWT token available to angular app
router.get('/token', function (req,res) {
    res.send(req.session.token);

});
router.use('/', express.static('app'));
moudle.exports = router;
