const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    let mongoDB = 'mongodb://127.0.0.1:27017/visitors';
    mongoose.connect(mongoDB, {useNewUrlParser: true});
    User.find()
        .then(function (docs) {
            // docs.map(doc => {
            //     res.send(doc.login);
            // })
            res.render('all-users', {
                title: 'All users',
                "all" : docs
            });
        });
});
module.exports = router;
