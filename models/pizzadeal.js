let mongoose = require('mongoose');

let PizzaDealSchema = new mongoose.Schema({
        id:Number,
        deals:String,
        pizza:String,
        side:String,
        drink:String,
        price:Number,
        rating:{type:Number,default:0}},
    {collection: 'pizzadealsdb'});

module.exports = mongoose.model('Deals', PizzaDealSchema);

//code for posting pizzaDeal
///{"deals": "Andrew2","pizza": "medium","side": "ice cream","drink": "fanta","price": 20,"rating": 0}