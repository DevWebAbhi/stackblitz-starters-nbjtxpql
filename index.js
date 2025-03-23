const express = require('express');
const { default: mongoose } = require('mongoose');
const { resolve } = require('path');
const dotenv = require("dotenv");
const menuModel = require("./schema")

dotenv.config();
const app = express();
const port = 3010;
app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/post",async(req,res)=>{
  try {
    const{name,description,price} = req.body;
    if(!name || !price){
      return res.status(401).send({message:"Name and Price is required"});
    }
    if(description){
      await new menuModel({name,description,price}).save();
    }else{
      await new menuModel({name,price}).save();
    }
    return res.status(201).send({msg:"Menu item created sucessfully"});
  } catch (error) {
    return res.status(500).send({message:"something went wrong",error});
  }
})

app.get("/get",async(req,res)=>{
  try {
    const menuItems = await menuModel.find();
    return res.status(200).send({msg:"sucessfully",menuItems});
  } catch (error) {
    return res.status(500).send({message:"something went wrong",error});
  }
})

app.listen(port, async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db sucessfully")
  } catch (error) {
    console.log("Something went wrong while connecting to db")
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
