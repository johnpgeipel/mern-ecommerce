const User = require('../models/user');
const jwt = require('jsonwebtoken'); // generate signed token
const { expressjwt: expressjwt } = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = async (req, res) => {
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
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(400).json({ error: 'User with that email does not exist. Please signup' });
        }
    
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: 'Email and password dont match'});
        }
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });
    
        const { _id, name, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    } catch (err) {
        return res.status(400).json({ error: 'Database error' });
    }
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if (!user) {
            return res.sttus(403).json({
                error: 'Access denied'
            })
        }
    next();
}