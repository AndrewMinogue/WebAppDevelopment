let pizzas = require('../models/pizzas');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://AndrewMinogue:Hello123@ds235833.mlab.com:35833/pizzasdb';
mongoose.connect(mongodbUri);



let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//GET
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    pizzas.find(function(err, pizza) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(pizza,null,5));
    });
}

//GET
router.GetTotalPizzas = (req,res) => {

    res.setHeader('Content-Type', 'application/json');

    pizzas.find(function (err, pizza) {
        if (err)
            res.json({message: 'Orders not Found!', errmsg: err});
        else
            res.send(pizza.length.toString())
    });
}

//GET
    router.findOne = (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        pizzas.find({"_id": req.params.id}, function (err, pizza) {
            if (err)
                res.json({message: 'Order NOT Found!', errmsg: err});
            else
                res.send(JSON.stringify(pizza, null, 5));
        });
    }

//POST
    router.addPizza = (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        var pizza = new pizzas();

        pizza.paymenttype = req.body.paymenttype;
        pizza.deal = req.body.deal;
        pizza.price = req.body.price;
        pizza.discountcode = req.body.discountcode;

        pizza.save(function (err) {
            if (err)
                res.json({message: 'Pizza NOT Added!', errmsg: err});
            else
                res.json({message: 'Pizza Successfully Added!', data: pizza});
        });
    }

//PUT
    router.editPizza = (req, res) => {

        pizzas.findById(req.params.id, function (err, pizza) {
            if (err)
                res.json({message: 'Pizza NOT Found!', errmsg: err});
            else {
                pizza.paymenttype = req.body.paymenttype;
                pizza.deal = req.body.deal;
                pizza.price = req.body.price;
                pizza.discountcode = req.body.discountcode;
                pizza.rating = req.body.rating;

                pizza.save(function (err) {
                    if (err)
                        res.json({message: 'Order NOT Edited!', errmsg: err});
                    else
                        res.json({message: 'Order Successfully Edited!', data: pizza});
                });
            }
        });
    }

//PUT
    router.incrementRating = (req, res) => {

        pizzas.findById(req.params.id, function (err, pizza) {
            if (err)
                res.json({message: 'Pizza NOT Found!', errmsg: err});
            else {
                pizza.rating += 1;
                pizza.save(function (err) {
                    if (err)
                        res.json({message: 'Order NOT UpVoted!', errmsg: err});
                    else
                        res.json({message: 'Order rating Successfully increased!', data: pizza});
                });
            }
        });
    }


//DELETE
    router.deletePizza = (req, res) => {

        pizzas.findByIdAndRemove(req.params.id, function (err) {
            if (err)
                res.json({message: 'Order NOT DELETED!', errmsg: err});
            else
                res.json({message: 'Order Successfully Deleted!'});
        });
    }


module.exports = router;