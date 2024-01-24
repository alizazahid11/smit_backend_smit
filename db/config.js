const mongoose=require('mongoose')
const connectDB = async () => {
mongoose.connect("mongodb://localhost:27017/user",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});}
module.exports = connectDB;