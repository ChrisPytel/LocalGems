import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY


import jwt from "jsonwebtoken";
import verifyLogin from "../middleware/verifyLogin.js";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Renders the login page
router.get("/", async (req, res) => {
  console.log(`\nEntered the GET login route`);
  res.status(201).send({helloMsg: 'welcome to login'});  
});


// Used for posting data to server from the login form
router.post("/", async (req, res) => {  
  console.log(`\nEntered the POST login route with the following data:\n`, req.body);
  const { emailField, passwordField} = req.body;  
  
  let users = await db.collection('users');
  let databaseReturn = await users.find({email: `${emailField}`}).toArray(); 

  const userData = verifyLogin(emailField, passwordField, databaseReturn); //returns userData obj after verifying login info against DB
  console.log(`Our userData is: `, userData);

  if (!userData){
    console.error(`Bad login info, no JWT created`);
    return res.status(406).json({message: 'Invalid credentials'})
  }else{

    jwt.sign(userData , SECRET, { expiresIn: '30d' }, function(error, token) {
      if(error){
        console.error('Error generating token');
      }
      console.log(`Our token is created! Containing:\n`, token);
      return res.status(200).json({token}); //token successfully created and sent to client's localstorage
    });
  }
});


export default router;