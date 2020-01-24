// contactController.js
// Import contact model
Employee = require('./employeeModel');
// Handle index actions
exports.index = function (req, res) {
    Employee.get(function (err, employees) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Employee data returned.",
            data: employees
        });
    });
};
// Handle create contact actions
exports.add = function (req, res) {
    var employee = new Employee();
    employee.name = req.body.name ? req.body.name : employee.name;
    employee.empcode = req.body.empcode;
    employee.department = req.body.department;
    employee.grade = req.body.grade;
    // save the contact and check for errors
    employee.save(function (err) {
        res.json({
            message: 'New employee added!',
            data: employee
        });
    });
};
// Handle view employee info
exports.view = function (req, res) {
    Employee.findById(req.params.emp_id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({
            message: 'Employee details loading..',
            data: employee
        });
    });
};
// Handle update employee info
exports.update = function (req, res) {
    Employee.findById(req.params.emp_id, function (err, contact) {
        if (err)
            res.send(err);
            employee.name = req.body.name ? req.body.name : employee.name;
            employee.empcode = req.body.empcode;
            employee.department = req.body.department;
            employee.grade = req.body.grade;
            // save the contact and check for errors
            employee.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Employee Info updated',
                data: employee
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Employee.remove({
        _id: req.params.emp_id
    }, function (err, employee) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Employee deleted'
        });
    });
};