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
const { default: axios } = require('axios');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err)); // Execute main. If error, log it

// Connect to database
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.mwfwgau.mongodb.net/mcc-stats?retryWrites=true&w=majority');
}

// Player Schema and Model - containing players in an event
const eventSchema = new mongoose.Schema({
    place: Number,
    team: String,
    name: String,
    points: Number,
});

const playerSchema = new mongoose.Schema({
    name: String,
    uuid: String
})

const mcc26Model = mongoose.model('mcc26', eventSchema)
const mcc28Model = mongoose.model('mcc28', eventSchema)
const playerModel = mongoose.model('players', playerSchema)

/* SUPPORT FUNCTIONS */
async function createPlayer(name){
    let uuid = '';
    await axios.get('https://api.mojang.com/users/profiles/minecraft/'+name)
        .then(responseAxios => {
            // Create new player model - will delegate this to another website later
            playerModel.create({name:name, uuid: responseAxios.data.id})
            uuid = responseAxios.data.id;         
        })
    return uuid;
}

/* AUTHENTICATION */
// Login, sending the token
app.use('/login', (req,res) => {
    res.send({
        token: 'vbeursghjo2kojvea'
    });
})

/* API (only mcc 28 for now)*/

// GET player uuid
app.get('/api/uuid/:name', (req,res) => {
    // Find the player in the player collection
    playerModel.findOne({name:req.params.name}, async (err,resFind) => {
        // If there's a player in the collection, return their UUID
        if (resFind != null) {
            res.send(resFind.uuid);
            return;
        }
        // If not, create a new collection
        let uuid = await createPlayer(req.params.name)
        res.send(uuid);
    })
})

// GET data
app.get('/api/event/:event', (req,res) => {
    if (req.params.event == 'mcc28'){
        mcc28Model.aggregate([
            {
              '$lookup': {
                'from': 'players', 
                'localField': 'name', 
                'foreignField': 'name', 
                'as': 'player_data'
              }
            }], (err, resAgg) => {
                res.json(resAgg)
        })
    }
    if (req.params.event == 'mcc26') {
        mcc26Model.aggregate([
            {
              '$lookup': {
                'from': 'players', 
                'localField': 'name', 
                'foreignField': 'name', 
                'as': 'player_data'
              }
            }], (err, resAgg) => {
                res.json(resAgg)
        })
    }
    
})

// POST data - add data
app.post('/api/event/mcc28', (req,res)=>{
    mcc28Model.create({
        place: req.body.place,
        team: req.body.team,
        name: req.body.name,
        points: req.body.points,
    })

    res.send("Player added to MCC 28 - "+req.body.name)
})

// GET data - get data from player
app.get('/api/event/mcc28/:name', (req,res)=>{
    mcc28Model.findOne({name:req.params.name},(err,data)=>{
        res.json(data);
    })
})

// PUT request - update player info by finding name and update
app.put('/api/event/mcc28/:name', (req,res)=>{
    mcc28Model.findOneAndUpdate({name:req.params.name},req.body,{new:true},
        (err,data)=>{res.send(data);})
})

// DELETE request - delete a player from the database via name
app.delete('/api/event/mcc28/:name', (req,res)=>{
    mcc28Model.findOneAndDelete({name:req.params.name}, (err,data)=>{res.send(data);})
})

app.listen(port, () => console.log('API running at port '+port))

