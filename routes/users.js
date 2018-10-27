let user = require('../models/user');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://AndrewMinogue:Hello123@ds235833.mlab.com:35833/pizzasdb';
mongoose.connect(mongodbUri);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.Register = (req,res) => {

    res.setHeader('Content-Type', 'application/json');

    var newuser = new user();

    newuser.email = req.body.email;
    newuser.password = req.body.password;

    newuser.save(function (err,savedUser) {
        if (err)
            res.json({message: 'User NOT Added!', errmsg: err});
        else
            res.json({message: 'User Successfully Added!', data: newuser});
    });
};

router.Authenticate = (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    user.findOne({email:email, password:password}, function(err,user){
        if(err) {
            console.log(err);
            return res.json({message: 'User Not Authenticated'});
        }

        if(!user) {
            return res.json({message: 'User Not Authenticated'});
        }
        return res.json({message: 'User Successfully Authenticated'});
    })
};


module.exports = router;
