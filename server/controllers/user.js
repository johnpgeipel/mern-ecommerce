const User = require('../models/user');
const jwt = require('express-jwt'); // generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = async (req, res) => {
    // console.log("req.body", req.body);
    try {
        let user = new User(req.body);

        user = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    } catch (err) {
        res.json({
            err: errorHandler(err)
        });
    }
};

exports.signin = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400)
        }

    })


  
    
}
