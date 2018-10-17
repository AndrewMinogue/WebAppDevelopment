let pizzas = require('../models/pizzas');
let express = require('express');
let router = express.Router();

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

/*function getTotalPizzas(array) {
    let totalPizzas = 0;

    array.forEach(function(pizzas) {totalPizzas += pizzas.length;});
    return totalPizzas;
}*/


//GET
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(pizzas,null,5));
}

//GET
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var pizza = getByValue(pizzas,req.params.id);

    if (pizza != null)
        res.send(JSON.stringify(pizza,null,5));
    else
        res.send('Pizza NOT Found!!');

}

//POST
router.addPizza = (req, res) => {
    //Add a new donation to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = pizzas.length;

    pizzas.push({"id" : id, "paymenttype" : req.body.paymenttype, "deal" : req.body.deal, "price" : req.body.price, "discountcode": req.body.discountcode, "rating": 0});

    if((currentSize + 1) == pizzas.length)
        res.json({ message: 'Pizza Added Successfully!'});
    else
        res.json({ message: 'Pizza NOT Added!'});
}

//PUT
router.editPizza = (req, res) => {
    var pizza = getByValue(pizzas,req.params.id);

    pizza.id = req.body.id;
    pizza.paymenttype = req.body.paymenttype;
    pizza.deal = req.body.deal;
    pizza.price = req.body.price;
    pizza.discountcode = req.body.discountcode;
    pizza.rating = req.body.rating;

    if(pizza != null)
        res.json({ message: 'Pizza Edited Successfully!'});
    else
        res.json({ message: 'Pizza NOT Edited!'});
}

//PUT
router.incrementRating = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var pizza = getByValue(pizzas,req.params.id);

    if (pizza != null) {
      if(pizza.rating < 10) {
            pizza.rating += 1;
            res.json({status: 200, message: '+1 Rating', pizza: pizza});
        }
    }
    else
        res.send('Pizza NOT Found - Rating not increased!!');

}

//DELETE
router.deletePizza = (req, res) => {
    //Delete the selected donation based on its id
    var pizza = getByValue(pizzas,req.params.id);
    var index = pizzas.indexOf(pizza);

    var currentSize = pizzas.length;
    pizzas.splice(index, 1);

    if((currentSize - 1) == pizzas.length)
        res.json({ message: 'Pizza Deleted!'});
    else
        res.json({ message: 'Pizza NOT Deleted!'});
}

/*router.findTotalPizzas = (req, res) => {

    let pizza = getTotalPizzas(pizzas);
    res.json({totalpizzas : pizza});
}*/

module.exports = router;