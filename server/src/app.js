const express = require('express')
const bodyParser = require('body-parser')
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig');
const app = express()
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json())
const dotenv = require('dotenv');
dotenv.config();

async function LoginCheck (loginInfo) {
    let connection
    let result
    try {
        console.log(loginInfo.password)

        connection = await oracledb.getConnection(dbconfig)
        console.log('Connected to Oracle Database')

        result = await connection.execute( `SELECT * FROM \"GCASTROLARA\".AF_USERS WHERE USERNAME = \'${loginInfo.username}\' AND USER_PASSWORD = \'${loginInfo.password}\' `)
    } catch (err) {
        console.log(err)
    }
    finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                return console.error(err.message);
            }
        }

        if(result.rows.length == 1) {
            return 'match'
        } else if(result.rows.length > 1) {
            return 'multiple'
        } else {
            return 'no match'
        }
    }
}

app.post('/register', (req, res) => {
    res.send({
        message: `Hello, ${req.body.company} your company account has been successfully created.  Account is linked to ${req.body.email}`
    })
})

app.get('/GetLogin/', async function (req, res) {
   let rows = await LoginCheck(req.headers)
    res.send(rows);
});

app.listen(process.env.PORT || 8081)