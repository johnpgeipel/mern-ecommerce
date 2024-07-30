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
            return res.status(400).json({
                error: 'User with that email does not exist. Please sign up'
            })
        }
        // if user found make sure email and password match
        // create auth method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            })
        }

        // generate signed token with user id and secret
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expire date
        res.cookie('t', token, {expire: new Date() + 9999});
        // return res w user and token to frontend client
        const {_id, name, email, role } = user;
        return res.json({token, user: {_id, email, name, role}})
    })


  
    
}
