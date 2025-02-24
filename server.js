const express = require('express');
const server = express();
const env = require('dotenv') 
const cors = require('cors')
const sequelize =  require('./config/dbconfig');
const userRouter = require('./Routes/userRouter');

const cookeiParser = require('cookie-parser');

const PORT = process.env.PORT || 3001 ;


server.use(cors())
server.use(express.json());
server.use(express.urlencoded());
server.use(cookeiParser());

server.use('/api/user/v1',userRouter);

server.listen(PORT, () => {
    console.log('Server is running on port ',PORT);
});