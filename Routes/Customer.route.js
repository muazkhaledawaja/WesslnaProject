const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const CustomerController = require("../Controllers/Customer.Controller");

//Get a list of all customers
router.get("/customers/", CustomerController.getAllCustomers);

//Create a new customer
router.post("/customers/signup", CustomerController.createNewCustomer);

//Get a customer by id
// router.get("/customers/:id", CustomerController.findCustomerById);

//Update a customer by id
router.put("/customers/:id", CustomerController.updateACustomer);

//Delete a customer by id
router.delete("/customers/:id", CustomerController.deleteACustomer);

//Login a customer
router.post("/customers/login", CustomerController.loginCustomer);

//Signup a customer

//Test the jwt
// router.get("/jwt-test", middleware.verify, CustomerController.jwtTest);

module.exports = router;
