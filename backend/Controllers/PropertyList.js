// import the model
const Restaurant = require('../Models/Property');


// export the controller functionalities

exports.getAllPropertyListings = (req, res) => {
    Property.find({
        propertyId: cityName
    }).then(result => {
        res.status(200).json({
            message: `Property listed`,
            property: result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}

exports.SellerAction = (req, res) => {
    const propertyId = req.params.propertyId;
    Restaurant.find({
        _id: restId
    }).then(result => {
        res.status(200).json({
            message: `Property fetched for id : ${propertyId}`,
            restaurant: result[0]
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}

exports.filterProperty = (req, res) => {
    // logic to filter the Restaurant data

    const { 
        location, 
        propertytype, 
        cost, 
     } = req.body;

    let filters = {};

    // add logic to apply filters

    if (propertytype) {
        filters.property_id = mealtype;
    }

    if (location) {
        filters.location_id = location;
    }

    Property.find(filters).then(result => {

        
        const pageSize = 2;
        let tempArray = [];

        function paginate(arr, page_size, page_no) {
           let paginatedResult = [];
           paginatedResult = arr.slice(page_size * (page_no - 1) , page_size * page_no)
           return paginatedResult;
        }

        tempArray = paginate(result, pageSize, page);

        res.status(200).json({
            message: `Filtered Properties fetched`,
            property: tempArray,
            totalResultsCount: result.length,
            pageNo: page,
            pageSize: pageSize
        });

    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    })
}

