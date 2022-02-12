const express = require('express');
const router = express.Router();

// import the controller
const locationController = require('../Controllers/Locations');
const userController = require('../Controllers/Users');
const BuyerController = require('../Controllers/Buyer');
//const PropertyListController = require('../Controllers/PropertyList');

// declare the routes and bind to controller methods

router.get('/getAllLocations',locationController.getAllLocations);
router.get('/getPropertyTypes', (req, res) => { });
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/update', userController.update);
//router.get('/bookingStatus', BuyerController.BuyerBooking);
//router.get('/propertylist', PropertyListController.PropertyList);
module.exports = router;