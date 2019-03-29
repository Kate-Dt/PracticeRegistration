const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require('express-validator');
const router = express.Router();
const flash = require('connect-flash');
router.use(validator());
router.use(flash());

let User = require('../models/user');

router.get('/', function(req, res){
    res.render('register');
});

router.post('/', function(req, res){
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('login', 'Login is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    req.checkBody('email', 'Email is not valid').isEmail();

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors:errors
        });
    } else {
        let newUser = new User({
            email:email,
            login:login,
            password:password
        });
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        console.log("inside err");
                        return;
                    } else {
                        req.flash('success','You are now registered and can log in');
                        // res.send('Congrats');
                        res.redirect('/users');
                    }
                });
            });
        });
    }
});

module.exports = router;
