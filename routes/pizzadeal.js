let PizzaDeals = require('../models/pizzadeal');
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

//GET PizzaDealSchema
router.findAllDeals = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    PizzaDeals.find(function(err, pizzadeal) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(pizzadeal,null,5));
    });
}

//GET PizzaDealSchema
router.GetTotalPizzaDeals = (req,res) => {

    res.setHeader('Content-Type', 'application/json');

    PizzaDeals.find(function (err, pizza) {
        if (err)
            res.json({message: 'Orders not Found!', errmsg: err});
        else
            res.send(pizza.length.toString())
    });
}

//GET PizzaDealSchema
router.findOneDeal = (req,res) => {

    res.setHeader('Content-Type','application/json');

    PizzaDeals.find({"_id": req.params.id},function (err,pizza){
        if (err)
            res.json({message:'Deal Not Found!',errmsg:err});
        else
            res.send(JSON.stringify(pizza,null,5));
    });
}
//POST PizzaDealSchema
router.addPizzaDeal = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var pizza = new PizzaDeals();

    pizza.deals = req.body.deals;
    pizza.pizza = req.body.pizza;
    pizza.side = req.body.side;
    pizza.drink = req.body.drink;
    pizza.price = req.body.price;

    pizza.save(function (err) {
        if (err)
            res.json({message: 'Pizza Deal NOT Added!', errmsg: err});
        else
            res.json({message: 'Pizza Deal Successfully Added!', data: pizza});
    });
}


//PUT PizzaDealSchema
router.editPizzaDeal = (req, res) => {

    PizzaDeals.findById(req.params.id, function (err, pizza) {
        if (err)
            res.json({message: 'Deal NOT Found!', errmsg: err});
        else {
            pizza.deals = req.body.deals;
            pizza.pizza = req.body.pizza;
            pizza.side = req.body.side;
            pizza.drink = req.body.drink;
            pizza.price = req.body.price;

            pizza.save(function (err) {
                if (err)
                    res.json({message: 'Deal NOT Edited!', errmsg: err});
                else
                    res.json({message: 'Deal Successfully Edited!', data: pizza});
            });
        }
    });
}

//PUT PizzaDealSchema
router.incrementDealRating = (req, res) => {

    PizzaDeals.findById(req.params.id, function (err, pizza) {
        if (err)
            res.json({message: 'Deal NOT Found!', errmsg: err});
        else {
            pizza.rating += 1;
            pizza.save(function (err) {
                if (err)
                    res.json({message: 'Deal NOT UpVoted!', errmsg: err});
                else
                    res.json({message: 'Deal rating Successfully increased!', data: pizza});
            });
        }
    });
}

//DELETE PizzaDealSchema
router.DeletePizzaDeal = (req, res) => {

    PizzaDeals.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Deal NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Deal Successfully Deleted!'});
    });
}

module.exports = router;