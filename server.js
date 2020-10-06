// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8800;
const server = app.listen(port,listening);

app.get('/data', (req,res)=>{
    res.send(projectData);
})

app.post('/data',(req,res) =>{
    projectData = req.body;
    res.send("success");
})

function listening(){
    console.log('server is running');
    console.log(`check localhost/${port}`);
}