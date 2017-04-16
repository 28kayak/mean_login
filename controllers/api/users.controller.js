/**
 * Created by kaya on 3/28/2017.
 */
var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('service/user.service');

//routers
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id',updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;
function authenticateUser(req,res)
{
    userService.authenticate(req.body.username, req.body.password)
        .then(function(token){
            if(token)
            {
                //authentication successful
                res.send({token : token});
            }//if
            else
            {
                //authentication field
                res.sendStatus(401);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}//func: authenticateUser
function registerUser(req,res){
    userService.create(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getCurrentUser(req,res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if(user) {
                res.send(user);
            }
            else
            {
                res.sendStatus(404);
            }
        })
        .catch(function (err){
            res.status(400).send(err);
        });

}
function updateUser()
{
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });


}
function deleteUser()
{
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

}