const sequelize = require("../config/dbconfig.js");
const express = require('express')
const { body, check } = require("express-validator");
const router = express.Router();
const userController = require('../http/controller/userController');
const User = require("../models/userModel");
const authentication = require("../http/middlewear/authentication");

router.post('/register',
// [
//   body('fullname').notEmpty().withMessage('name is required'),
//   body('email').isEmail().withMessage('email is required')
//   .custom( async (value,{req})=>{
//    return User.findOne({ 
//     where:{
//       email:req.body.email
//     }
//   })
//     .then(data=>{
//       if(data){
//         return Promise.reject('email already exists') }
//     })
//   }),
//   body('password').isLength({ min: 5 }).withMessage('password is required'),
// ],
 userController().registration)

.post('/login', userController().login)
.delete('/delete', 
  // authentication().authMiddlewear, 
  userController().delete)
.get('/alluserlist', 
  // authentication().authMiddlewear, 
  userController().getAllUsersList)

module.exports = router