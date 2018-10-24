let mongoose = require('mongoose');

let PizzaSchema = new mongoose.Schema({
    id:Number,
    paymenttype:String,
    deal:String,
    price:Number,
    discountcode:String,
    rating:{type:Number,default:0}},
    {collection: 'pizzasdb'});

module.exports = mongoose.model('Order', PizzaSchema);

//Code for posting PizzaOrder
// {"paymenttype" : "Visa" , "deal" : "Andrew1" , "price" : 20 , "discountcode" : "spook" ,  "rating" : 0}