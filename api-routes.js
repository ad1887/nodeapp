const router = require('express').Router();
var todos = ['xx', 'yy', 'zz'];
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next();
});

router.get('/', function(req, res){
    res.json({
        'status' : 'Rest api routes',
        'message' : 'Welcome to Rest Api routes'
    });
});

router.get('/todos', function(req, res){
    res.status(200).send({
        'status' : true,
        'data': todos
    });
});

// Import employee controller
var employeeController = require('./employee/employeeController');
// Contact routes
router.route('/employee')
    .get(employeeController.index)
    .post(employeeController.add);
router.route('/employee/:emp_id')
    .get(employeeController.view);
    // .patch(contactController.update)
    // .put(contactController.update)
    // .delete(contactController.remove);

// Import contact controller
var csvController = require('./csv/csvController');
router.route('/exportcsv')
    .get(csvController.exportcsv);

module.exports = router;