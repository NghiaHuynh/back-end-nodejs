const { Sequelize } = require('sequelize');
const config = require(__dirname + '/../config/config.json');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.database, config.username, null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connectDB };