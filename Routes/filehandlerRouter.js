const express = require('express');
const filehandler = require('../http/middlewear/filehandler');
const filehandlerController = require('../http/controller/filehandlerController');
const router = express.Router();

router
.get('/v1/development/getfilesfromdisk/:filename', filehandlerController.AccesDiskFiles)  //development Only

module.exports = router;