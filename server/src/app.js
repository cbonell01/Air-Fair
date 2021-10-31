const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())

app.post('/register', (req, res) => {
    res.send({
        message: `Hello, ${req.body.company} your company account has been successfully created.  Account is linked to ${req.body.email}`
    })
})

app.listen(process.env.PORT || 8081)