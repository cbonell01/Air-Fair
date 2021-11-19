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

async function LoginCheck(userName, password) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(dbconfig)
        console.log('Connected to Oracle Database')

        result = await connection.execute(`SELECT * FROM \"GCASTROLARA\".AF_USERS WHERE USERNAME = \'${userName}\' AND USER_PASSWORD = \'${password}\' `)
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return console.error(err.message);
            }
        }

        if (result.rows.length == 1) {
            return 'match'
        } else if (result.rows.length > 1) {
            return 'multiple'
        } else {
            return 'no match'
        }
    }
}

async function FindCompanyID (companyName) {
    console.log(companyName)
    let connection, result;
    let ID = -1;
    try {
        connection = await oracledb.getConnection(dbconfig)
        result = await connection.execute(`SELECT COMPANY_ID FROM \"GCASTROLARA\".COMPANY WHERE COMPANY_NAME = \'${companyName}\'`)
        console.log(result.rows.length)
        if(result.rows.length > 0) {
            ID = result.rows[0][0]
        }
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                return console.error(err.message);
            }
        }
        return ID
    }
}

async function AddCompany (companyName) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(dbconfig)
        result = await connection.execute(`INSERT INTO \"GCASTROLARA\".COMPANY(COMPANY_NAME) VALUES(:0)`, [companyName], { autoCommit: true });
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return console.error(err.message);
            }
        }
    }
}

async function RegisterAccount (registrationInfo) {
    // First ensure that there is no accounts linked to the provided username and password
    if (await LoginCheck(registrationInfo.email, registrationInfo.password) === 'no match') {
        let companyID = await FindCompanyID(registrationInfo.company)
        console.log(companyID)
        if (companyID === -1) {
            await AddCompany(registrationInfo.company)
            companyID = await FindCompanyID(registrationInfo.company)
        }
        let connection, result;
        try {
            connection = await oracledb.getConnection(dbconfig)
            console.log(registrationInfo.username,
                registrationInfo.phone,
                registrationInfo.password,
                'General', companyID)
            result = await connection.execute(`INSERT INTO 
                                               \"GCASTROLARA\".AF_USERS 
                                               VALUES(:0, :1, :2, :3, :4)`,
                                                [registrationInfo.username,
                                                registrationInfo.phone,
                                                registrationInfo.password,
                                                'General',
                                                companyID],
                                                { autoCommit: true });
            console.log(result)

        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();

                } catch (err) {
                    return console.error(err.message);
                }
            }

            return ''
        }

    } else {
        return 'existing account found'
    }
}

async function search(origin, destination) {
    let sql = `SELECT * FROM \"GCASTROLARA\".BASE_FLIGHT_PLANS WHERE ORIGIN = \'${origin}\' AND DESTINATION = \'${destination}\'`;
    console.log(sql)
    let connection, result;
    try {
        oracledb.fetchAsString = [ oracledb.CLOB ];
        connection = await oracledb.getConnection(dbconfig)
        result = await connection.execute(sql);
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return console.error(err.message);
            }
        }
    }
    console.log(result.rows[0])
    return result.rows
}

app.get('/Register', async function (req, res) {
    console.log(req.headers)
    await RegisterAccount(req.headers)
    res.send('')
})

app.get('/GetLogin/', async function (req, res) {
    let rows = await LoginCheck(req.headers.username, req.headers.password)
    res.send(rows);
});

app.get('/SearchFlight/', async function (req, res) {
    let flights = await search(req.headers.org, req.headers.dest)
    console.log(flights)
    res.send(flights)
});
app.listen(process.env.PORT || 8081)