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
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email})
        res.json({
            user
        });
        
        
    } catch (err) {
        res.json({
            err: errorHandler(err)
        });
    }

        // const { email, password } = req.body;
        // User.findOne({ email })
        //     .then((user) => {
        //         console.log(user)
        //         res.json({
        //             user
        //         })
        //     })
        // .catch((err) => {
        //     res.json({
        //         err: errorHandler(err)
        //     });
        // })

   

  
    
}
