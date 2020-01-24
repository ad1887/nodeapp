// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    empcode: {
        type: String,
        required: true
    },
    department: String,
    grade: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Employee model
var Employee = module.exports = mongoose.model('employee', employeeSchema);

module.exports.get = function (callback, limit) {
    Employee.find(callback).sort({_id: '-1'}).limit(limit);
}