const User = require("../../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const authentication = require("../middlewear/authentication");




function userController(){
    {
        return {
           registration: async (req, res)=>
                        {
                            try{
                                const errors = validationResult(req);
                                if(!errors.isEmpty()){
                                    res.status(409).json({status:false,message:errors['errors'][0]['msg']})
                                    return
                                }
                                const { fullname, email, password } = req.body;
                                
                                let data = await User.create({fullname:fullname, email:email, password:password});
                                if(data)
                                {
                                   const token = jwt.sign({"email":email,"password":password}, process.env.AUTH_KEY, { expiresIn: '2d' });
                                   res.status(200).json({"status":true,"data":data,"token":token});
                                }else{
                                    res.status(409).json({"status":false, "message":"User not create..!"})
                                }
                            }
                            catch(err){
                                console.log("Row Error in registration_action-->",err);
                                res.status(400).json({"status":false,"message":"Opps bed request!"});
                            }
                        },
           login: async (req, res) =>
           {
               try{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    res.status(409).json({status:false,message:errors['errors'][0]['msg']})
                    return
                }
                   const {email, password} = req.body;
                   console.log("--->>",email, password)
                   const data = await User.findOne({
                       where:{
                           "email":req.body.email,
                        //    "password":req.body.password
                       }
                   });
                //    console.log("data----->", data)
                //    if(email)

                    if(data)
                    {
                       const token = jwt.sign({"email":email,"password":password}, process.env.AUTH_KEY, { expiresIn: '2d' });
                       res.status(200).json({"status":true,"data":data,"token":token});
                    }else{
                       res.status(409).json({"status":false, "message":"User not registered"});
                    }
               }
               catch(err){
                   console.log("Row Error in registration_action-->",err);
                   res.status(400).json({"status":false,"message":"something wrong in fetching"});
               }
           },
           delete : async (req, res) =>
           {
             try{
                const token = req.headers.authorization.split(" ")[1];
                const decodedToken = jwt.verify(token, process.env.AUTH_KEY);
                req.token = decodedToken;
                console.log("-->",req.token);
                const data = await User.destroy({
                    where: {
                        email:req.token.email,
                        password:req.token.password
                      }
                    });
                if(data)
                 res.status(200).json({"status":true,"message":"user deleted succesfully"});
                else 
                 res.status(409).json({"status":false,"message":"user not found"});
             }catch(err){
                //  console.log("-->",err);
                res.status(400).json({"status":false,"message":"Oops something is wrong!"});
             }
           },
           getAllUsersList:async (req, res) =>
            {
              try{
                const list =  await User.findAll();
                res.status(200).json({"status":true,"data":list});
              }catch(err){
                // console.log("-->",err);
                res.status(400).json({"status":false,"message":"Oops something is wrong!"});
              }
            }
        }
    } 
}
module.exports = userController;