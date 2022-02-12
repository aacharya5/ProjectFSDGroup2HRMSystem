const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PropertySchema = new Schema(
    {

        property_id: {
            type: String,
            required: true
        },

        bookignStatus: {
            type: Boolean,
            required: true
        },

        seller_id: {
            type: String,
            required: false
        }

        cost: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        country_name: {
            type: String,
            required: true
        },

        
    }

)

module.exports = mongoose.model('Property', PropertySchema, 'Property');