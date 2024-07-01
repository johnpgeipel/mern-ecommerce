const User = require('../models/user');

// exports.signup = (req, res) => {
//     try {
//         const user = new User(req.body);
//         console.log("req.body", req.body);
//         user = user.save().then(
//             res.status(200).json({
//                 message: "Created",
//                 user,
//             })
//         )
//     } catch (err) {
//         res.status(500).json({
//           message:
//             "error data was not created",
//         });
//     }
// };

exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        // console.log("req.body", req.body);
        // console.log("user", user);

        // Await the Promise returned by .save()
        const savedUser = await user.save();

        res.status(200).json({
            message: "Created",
            user: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
};

// exports.signup = async (req, res) => {
//     console.log("req.body", req.body)

//     const user = new User(req.body);
//     let savedUser = await user.save();
//     console.log("savedUser", savedUser);
//     console.log("user", user);
// }