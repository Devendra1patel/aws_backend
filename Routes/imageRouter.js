// const sequelize = require("../dbconfig");
const express = require('express');
const filehandler = require('../http/middlewear/filehandler');
const Banners = require('../models/bannersModel');
const router = express.Router();
// const { body, check } = require("express-validator");
// const userController = require('../http/controller/userController');
// const User = require("../models/userModel");
// const authentication = require("../http/middlewear/authentication");

router.post('/v1/upload', filehandler().uploadFileDisk.single('file'), (req, res)=>{
    return res.send(req.body.file)
})
module.exports = router;