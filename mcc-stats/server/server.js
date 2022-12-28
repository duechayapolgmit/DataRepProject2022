const express = require('express');
const bodyParser = require('body-parser'); // middleware
const app = express();
const port = 4000;

/* MIDDLEWARE */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* CORS */
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* DATABASE */
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err)); // Execute main. If error, log it

// Connect to database
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.mwfwgau.mongodb.net/mcc-stats?retryWrites=true&w=majority');
}

// Player Schema and Model - containing players in an event
const playerSchema = new mongoose.Schema({
    place: Number,
    team: String,
    name: String,
    points: Number,
});
const playerModel = mongoose.model('mcc28', playerSchema)

/* AUTHENTICATION */
// Login, sending the token
app.use('/login', (req,res) => {
    res.send({
        token: 'vbeursghjo2kojvea'
    });
})

/* API (only mcc 28 for now)*/

// GET data
app.get('/api/event/mcc28', (req,res) => {
    playerModel.find((err, data)=>{
        res.json(data);
    })
})

// POST data - add data
app.post('/api/event/mcc28', (req,res)=>{
    playerModel.create({
        place: req.body.place,
        team: req.body.team,
        name: req.body.name,
        points: req.body.points,
    })

    res.send("Player added to MCC 28 - "+req.body.name)
})

// GET data - get data from player
app.get('/api/event/mcc28/:name', (req,res)=>{
    playerModel.findOne({name:req.params.name},(err,data)=>{
        res.json(data);
    })
})

// PUT request - update player info by finding name and update
app.put('/api/event/mcc28/:name', (req,res)=>{
    playerModel.findOneAndUpdate({name:req.params.name},req.body,{new:true},
        (err,data)=>{res.send(data);})
})

// DELETE request - delete a player from the database via name
app.delete('/api/event/mcc28/:name', (req,res)=>{
    playerModel.findOneAndDelete({name:req.params.name}, (err,data)=>{res.send(data);})
})

app.listen(port, () => console.log('API running at port '+port))

