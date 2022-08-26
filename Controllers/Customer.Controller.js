const createError = require("http-errors");
const mongoose = require("mongoose");

const Customer = require("../Models/Customer.model");
const bcrypt = require("bcryptjs");
const rounds = 10;

const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
const catchAsync = require('../catchAsync')

module.exports = {
        getAllCustomers: catchAsync(async(req, res, next) => {

            const results = await Customer.find({}, { __v: 0 });
            // const results = await Customer.find({}, { name: 1, price: 1, _id: 0 });
            // const results = await Customer.find({ price: 699 }, {});
            res.send(results);
        })
    },
    module.exports = {
        createNewCustomer: catchAsync(async(req, res, next) => {

            const customer = new Customer(req.body);
            const result = await customer.save();
            res.send(result);

            /*Or:
  If you want to use the Promise based approach*/
            /*
  const customer = new Customer({
    name: req.body.name,
    price: req.body.price
  });
  customer
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
        })
    },
    module.exports = {
        findCustomerById: catchAsync(async(req, res, next) => {
            console.log("req param", req.params);
            const id = req.params.id;
            try {
                const customer = await Customer.findOne({ _id: id });
                if (!customer) {
                    throw createError(404, "Customer does not exist.");
                }
                const { pass, ...rest } = customer;
                console.log("rest", rest);
                const { password, ...resa } = rest._doc;

                res.status(200).send(resa);
            } catch (error) {
                console.log(error.message);
                if (error instanceof mongoose.CastError) {
                    next(createError(400, "Invalid Customer id"));
                    return;
                }
                next(error);
            }
        })
    },
    module.exports = {
        updateACustomer: catchAsync(async(req, res, next) => {

            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await Customer.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, "Customer does not exist");
            }
            res.send(result);

        })
    }


module.exports = {
        deleteACustomer: catchAsync(async(req, res, next) => {
            const id = req.params.id;
            const result = await Customer.findByIdAndDelete(id);
            // console.log(result);
            if (!result) {
                throw createError(404, "Customer does not exist.");
            }
            res.send(result);

        })
    },

    module.exports = {
        loginCustomer: catchAsync(async(req, res) => {
            console.log("body", req.body.email);
            await Customer.findOne({ email: req.body.email })
                .then((user) => {
                    console.log("user object", user);
                    if (!user)
                        res
                        .status(404)
                        .json({ message: "Customer does not exist with that email." });
                    else {
                        bcrypt.compare(req.body.password, user.password, (error, match) => {
                            if (error) res.status(500).json({ message: error.message });
                            else if (match)
                                res.status(200).json({ token: generateToken(user) });
                            else res.status(403).json({ message: "The password is wrong" });
                        });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ message: error });
                });
        })
    },
    module.exports = {
        signupCustomer: catchAsync(async(req, res) => {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) throw createError(500);
                else {
                    const newCustomer = new Customer({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        phoneNumber: req.body.phoneNumber,
                        verified: false,
                        date: new Date(),
                    });
                    newCustomer
                        .save()
                        .then((customer) => {
                            console.log("dfffdfflk-----------", generateToken(customer));
                            res.status(200).send({ token: generateToken(customer) });
                        })
                        .catch((error) => {
                            console.log("eror", error);
                            res.status(500).json({ error: error });
                        });
                }
            });
        })
    },
    module.exports = {
        jwtTest: catchAsync(async(req, res) => {
            res.status(200).json(req.user);
        })
    },


    function generateToken(customer) {
        return jwt.sign({ data: customer }, tokenSecret, { expiresIn: "24h" });
    }