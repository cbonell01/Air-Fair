const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())

app.get('/status', (reg, res) => {
    res.send({
        message: 'Hello World!'
    })
})

app.listen(process.env.PORT || 8081)