const Locations = require ('../Models/Locations');

exports.getAllLocations = (req, res) => {
    Locations.find().then(
        result => {
            res.status(200).json({
                message: 'Locations fetched',
                locations: result
            });
        }
    ).catch(
        err =>{
            res.status(500).json({
                message: 'Error in DB',
                error: err
            });     
        }
    )
 }