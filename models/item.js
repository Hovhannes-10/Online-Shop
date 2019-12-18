const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    info:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    inCart:{
        type:Boolean,
    },
    count:{
        type: Number,
    },
    data:{
        type: Date,
        default: Date.now
    }
}) 
module.exports = Item = mongoose.model("item" , ItemSchema)