const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true}
})

const menuModel = mongoose.model("Menu-Items",schema);

module.exports = menuModel;