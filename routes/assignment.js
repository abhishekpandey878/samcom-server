const routes = require('express').Router();
const auth = require('../middleware/auth');

//Controller modules
const {addEmployee, getAllEmployee, updateEmployee, deleteEmployee, getById} = require('../controller/employeeController');
const {login, signup} = require('../controller/userController');

/*
 @des Routes for login and singup 
*/
routes.post('/user/login', login);
routes.post('/user/signup', signup);


/*
 @des Route for employee
*/
routes.route('/employeeById/:id').get(auth, getById);;
routes
    .route('/employee')
        .get(getAllEmployee)
        .post(auth, addEmployee)
        .put(auth, updateEmployee)
        .delete(auth, deleteEmployee)

module.exports = routes