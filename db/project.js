const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    title:String,
    description:String,
    url:String
    
})
module.exports=mongoose.model("project",userSchema)