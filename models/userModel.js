const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbconfig');
const bcrypt = require('bcrypt');
const User = sequelize.define('users',{
   "id":{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true
   },
   "fullName":{
    type:Sequelize.STRING
   },
   "email":{
    type:Sequelize.STRING,
    allowNull:false
   },
   "password":{
    type:Sequelize.STRING
   },
   "mobileNumber1":{
    type:Sequelize.STRING
   },
   "mobileNumber2":{
    type:Sequelize.STRING
   },
   "address_id":{
    type:Sequelize.INTEGER
   },
   "profilePic":{
    type:Sequelize.STRING
   }
},{
    tableName:"users",
    timestamps:true,
    hooks:{
        beforeSave: async (user, options) =>{
            const salt = await bcrypt.genSalt(10);
            try{
                user.password = await bcrypt.hash(user.password, salt)
            }catch(err){
                console.log(err)
            }
        },
        beforeUpdate: async (user, options) =>{
            const salt = await bcrypt.genSalt(10);
            try{
                user.password = await bcrypt.hash(user.password, salt)
            }catch(err){
                console.log(err)
            }
        }
    }
})
module.exports = User;