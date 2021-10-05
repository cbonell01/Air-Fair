const express = require('express');

const app = express()
const PORT = 8080;

app.get('/', (req, res)=> {
    res.end('Hello World');
})

app.get('/hello', (req, res) => {
    res.end('Here is the actual hello page');
})

app.listen(PORT, () => {
    console.log(`Express running on port ${PORT}`);
});