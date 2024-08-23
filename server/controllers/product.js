const { formidable } = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }
        // fixes values being returned as arrays in Postman form-data
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

        let product = new Product(fields);

        if (files.photo) {
            if (files.photo[0].size > 1000000) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }
            product.photo.data = fs.readFileSync(files.photo[0].filepath);
            product.photo.contentType = files.photo[0].mimetype;
        }
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