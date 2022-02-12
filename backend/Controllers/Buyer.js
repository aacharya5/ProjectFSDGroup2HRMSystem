// import the model
const Mealtype = require('../Models/Buyer');


// export the controller functionalities

exports.Booking = (req, res) => {
    Mealtype.find().then(result => {
        res.status(200).json({
            message: 'Property Booked Successfully Enjoy!!',
            booking : result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}

