const Employee = require('../model/employee');
const User = require('../model/user');
const jwt = require('jsonwebtoken')
require('dotenv').config();

/*
     @des Fatching all employee.
*/
const getAllEmployee = async(req, res) => {
    try {
        console.log("req",req)
        const employee = await Employee.find();
        if(employee.length)
        res.send(employee);

        else
        res.status(401).json({msg: 'No employee are exist.'});

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Creating a employee
*/
const addEmployee = async(req, res) => {
    try {
        console.log(req.body)
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        
            const employee = await Employee.create(req.body);
             res.send(employee);

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Updating a employee
*/
const updateEmployee = async(req, res) => {
    try {

        const _id = req.query._id;

            await Employee.updateOne(_id, req.body)
            res.send("employee has been updated")

    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

/*
     @des Deleting a employee
*/
const deleteEmployee = async(req, res) => {
    try {

        const email = req.query.email;   
        console.log("rdfdg", email) 

            await Employee.deleteOne({email: email})
            res.send("employee has been removed")
      
    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

const getById = async(req, res) => {
    try {

        const _id = req.query._id;  

           const employee = await Employee.findById(_id)
            // res.send(employee);
            if (employee) {
                res.send(employee);
            }
      
    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

module.exports = { addEmployee, getAllEmployee, updateEmployee, deleteEmployee, getById }