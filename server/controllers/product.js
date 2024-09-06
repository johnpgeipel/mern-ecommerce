const { formidable } = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// fixes values being returned as arrays in Postman form-data
function setFieldsValues(fields) {
    const nameValue = fields.name[0],
        descriptionValue = fields.description[0],
        priceValue = fields.price[0],
        categoryValue = fields.category[0],
        quantityValue = fields.quantity[0],
        shippingValue = fields.shipping[0]

        fields.name = nameValue;
        fields.description = descriptionValue;
        fields.price = priceValue;
        fields.category = categoryValue;
        fields.quantity = quantityValue;
        fields.shipping = shippingValue;
    return fields;
}
// checks photo file size, updates product.photo data
function setProductPhotoData(files, product) {
    if (files.photo) {
        if (files.photo[0].size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        };
        product.photo.data = fs.readFileSync(files.photo[0].filepath);
        product.photo.contentType = files.photo[0].mimetype;
        return product;
    }
}

exports.productById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }
        req.product = product;   
        next();
    } catch (err) {
        return res.status(400).json({   
            error: 'Product not found'
        });
    }
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        setFieldsValues(fields);

        let product = new Product(fields);

        setProductPhotoData(files, product);

        // async/await to fix mongodb callback
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

exports.deleteOne = async (req, res) => {
    try {
        const product = req.product;
        // console.log(product);
        const deletedProduct = await product.deleteOne();
        res.json({
            deletedProduct,
            message: 'Product successfully removed'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

exports.update = (req, res) => {
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        setFieldsValues(fields);

        let product = req.product;
        product = _.extend(product, fields);

        setProductPhotoData(files, product);

        // async/await to fix mongodb callback
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
