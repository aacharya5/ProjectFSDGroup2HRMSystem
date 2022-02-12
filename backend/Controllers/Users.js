// import the model
const User = require('../Models/Users');

// export the controller functionalities

exports.login = (req, res) => {

    const {
        username,
        password
     //   lastName,
     //   firstName,
     //   customerType
    } = req.body;
    //console.log("Body ", req.body);
    User.find({
        email: username,
        password: password
    }).then(result => {
        console.log("Login Result", result[0]);
        if (result.length > 0) {
            res.status(200).json({
                message: 'User logged in Successfully !!',
                isLoggedIn: true,
                user: result[0]
                //user: result[0]
            });
        } else {
            res.status(400).json({
                message: 'Username or password is wrong',
                isLoggedIn: false
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}


exports.signup = (req, res) => {
    
    const {
        username,
        password,
        firstName,
        lastName,
        customerType
    } = req.body;

    //console.log("Body ", req.body);
    // create an object of the User Model Class
    // const userObj = new User({
    //     email: username,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName
    // });
    const userObj = new User(req.body);
    // console.log("UserObject  " + userObj);
    // call a save method on this Object
    userObj.save().then(result => {
        console.log('In Update');
        res.status(200).json({
            message: 'User signed up Successfully !!',
            user: result
        });
    }).catch(error => {
        console.log('In Error Update', + error);
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}


exports.update = (req, res) => {
    
    const {
        username,
        password,
        firstName,
        lastName
    } = req.body;

    console.log("Body ", req.body);
    // create an object of the User Model Class
    // const userObj = new User({
    //     email: username,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName
    // });
    //const userObj = new User(req.body);
    console.log("UserObject  " + req.body.email + req.body.firstName + req.body.lastName);
    // call a save method on this Object
    User.updateOne({email : req.body.email}, {$set: {firstName: req.body.firstName, lastName: req.body.lastName }}).then(result => {
        console.log('In Update Record');
        console.log('Update result ', result);
        res.status(200).json({
            message: 'User profile udpated Successfully !!',
            user: result
        });
    }).catch(error => {
        console.log('In Error Update', + error);
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}
