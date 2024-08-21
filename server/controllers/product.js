const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let product = new Product(fields)

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
            product.photo.contentType = files.photo.mimetype; // change type to mimetype
        }

        // product.save((err, result) => {
        //     if (err) {
        //         return res.status(400).json({
        //             error: errorHandler(err)
        //         });
        //     }
        //     res.json({
        //         result
        //     })
            
        // });
        try {
            const data = await product.save();
            res.json({
                data
            });
        } catch (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        };
    })
}

// exports.create = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         const data = await product.save();
//         res.json({
//             data
//         });

//     } catch (err) {
//         return res.status(400).json({
//             error: errorHandler(err)
//         });
//     };
// }