const express = require('express');
const router = express.Router();

// import the controller
const locationController = require('../Controllers/Locations');
const userController = require('../Controllers/Users');

// declare the routes and bind to controller methods

router.get('/getAllLocations',locationController.getAllLocations);
router.get('/getPropertyTypes', (req, res) => { });
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/update', userController.update);

module.exports = router;