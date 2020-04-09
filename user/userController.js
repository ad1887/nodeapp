// userController.js
// Import user model
User = require('./userModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, employees) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User data returned.",
            data: employees
        });
    });
};
// Handle create contact actions
exports.add = function (req, res) {
    var user = new User();
    console.log('request data===>>', req.body);
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.username = req.body.username;
    user.password = req.body.password;
    // save the contact and check for errors
    user.save(function (err) {
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};