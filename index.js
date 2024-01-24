const express=require('express');
const cors=require('cors');
const connectDB=require('./db/config');

const project = require('./db/project');
const User = require('./db/user')
const app=express();
app.use(express.json());//middleware
const corsOptions = {
    origin: 'http://localhost:3000',  // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
connectDB();
app.use(cors(corsOptions));
//for user
//---------------------------------------//
app.post("/register", async (req, res) => {
    try {
      // Create a new user instance using the 'project' model
      let user = new User(req.body);
  
      // Save the user to the database
      let result = await user.save();
  
      // Remove sensitive information before sending the response
      result = result.toObject();
      delete result.password;
  
      res.status(201).json(result);
    } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ result: 'Please provide both email and password' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ result: 'No user found with the provided email' });
      }
  
      // Check if the provided password matches the stored password
      if (password !== user.password) {
        return res.status(401).json({ result: 'Incorrect password' });
      }
  
      // If the email and password are correct, send a success response
      res.status(200).json({ result: 'Login successful', user: { email: user.email } });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ result: 'Internal server error' });
    }
  });
//for products
//---------------------------------------//
app.post("/addproject",async(req,res)=>{
    let Project=new project(req.body);
    let result=await Project.save();
    res.send(result)
})
app.get("/products",async(req,res)=>{
    const products=await project.find();
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:"no product found"})
    }
})
// app.delete("/product/:id",async(req,res)=>{
//     let result=await Product.deleteOne({_id:req.params.id})
//     res.send(result)
// })
// //getting data from update table 
// app.get("/product/:id",async(req,res)=>{
//   let result=await Product.findOne({_id:req.params.id})
//   if(result){
//       res.send(result)
//   }else{
//     res.send({"result":"no product found"})
//   }
// })
// //update method 
// app.put("/product/:id",async(req,res)=>{
// let result=await Product.updateOne(
//     {_id:req.params.id},
//     {$set:req.body}
// )
// res.send(result)

// })
// //for search fetching data
// app.get("/search/:key",async(req,res)=>{
//     let result=await Product.find({
//         "$or": [
//             { "name": { $regex: new RegExp(req.params.key, 'i') },
            
//          }
            
        
//         ]
//     });
//     res.send(result);
    
// })

app.listen(5000)