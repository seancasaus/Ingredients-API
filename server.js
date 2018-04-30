var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var ingredients = [
    {
        "id":"232kAk",
        "text":"Eggs"
    },
    {
        "id":"dkP345",
        "text":"Milk"
    },
    {
        "id":"dkcuu7",
        "text":"Bacon"
    },
    {
        "id":"73hdy",
        "text":"Frogs Legs"
    }
];

app.get('/', function(req,res) {
    res.send(ingredients); //json response
});

app.post('/', function(req,res) {
    var ingredient = req.body;
    if (!ingredient || ingredient.text == "") {
        res.status(500).send({error: "Your ingredient must have text"});
    }
    else {
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
});

//port 3000
app.listen(3000, function() {
    console.log("Running on port 3000");
});