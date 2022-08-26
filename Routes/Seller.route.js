const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const SellerController = require("../Controllers/Seller.Controller");
const bodyParser = require("body-parser");

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Get a list of all Sellers
router.get("/sellers/", SellerController.getAllSellers);

//Create a new Seller
router.post("/sellers/signup", SellerController.signupSeller);

//Get a Seller by id
// router.get("/Sellers/:id", SellerController.findSellerById);

//Update a customer by id
router.put("/sellers/:id", SellerController.updateASeller);

//Delete a customer by id
router.delete("/sellers/:id", SellerController.deleteASeller);

//Login a Seller
router.post("/sellers/login", SellerController.loginSeller);

//Test the jwt
// router.get("/jwt-test", middleware.verify, SellerController.jwtTest);

module.exports = router;
