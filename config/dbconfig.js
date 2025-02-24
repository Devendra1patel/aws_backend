const {Sequelize} = require('sequelize');
const env = require('dotenv').config()
const sequelize = new Sequelize(process.env.SQL_DB , process.env.SQL_USERNAME, process.env.SQL_PASSWORD,{
    host:process.env.HOST,
    dialect:'mysql'
})

async function test()
{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
test();

module.exports = sequelize;