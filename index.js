const express = require('express');
const path = require('path');

const app = express()
const PORT = 8080;

app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

// Show that the server responds to something.
app.get('/', (req, res)=> {
    res.end('Hello World');
})

// Add a basic route
app.get('/hello', (req, res) => {
    res.end('Here is the actual hello page');
})

// Add a routes homepage
app.get('/routes', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// About Us page
app.get('/AboutUs', (req, res) => {
    res.sendFile(path.join(__dirname, '/AboutUs.html'));
});

app.get('/Reports', (req, res) => {
    res.sendFile(path.join(__dirname, '/Reports.html'));
});

app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '/Login.html'));
});

// Start the server and log to the console.
app.listen(PORT, () => {
    console.log(`Express running on port ${PORT}`);
    console.log(`Base directory: __dirname = ${__dirname}`);
});