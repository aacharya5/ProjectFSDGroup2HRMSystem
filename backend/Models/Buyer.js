const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BuyerSchema = new Schema(
    {

        Flattype: {
            type: String,
            required: true
        },

        BookingStatus: {
            type: String,
            required: true
        },

        PaymentStatus: {
            type: String,
            required: true
        },

        flat_id: {
            type: String,
            required: true
        },
    }

)

module.exports = mongoose.model('Buyer', BuyerSchema, 'Buyer');