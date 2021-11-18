const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_HOST
}
