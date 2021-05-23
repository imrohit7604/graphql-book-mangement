const mongoose=require("mongoose");
const {model,Schema}=mongoose;

const authorSchema=new Schema({
    name:String,
    age:Number
})

module.exports=model("Author",authorSchema);