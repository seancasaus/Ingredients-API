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

//gets the ingredients 
app.get('/ingredients', function(req,res) {
    res.send(ingredients); //json response
});

//adds an ingredient
app.post('/ingredients', function(req,res) {
    var ingredient = req.body;

    if (!ingredient || ingredient.text === "" || ingredient.id === "" || !ingredient.text || !ingredient.id) {
        res.status(500).send({error: "Your ingredient must have text and id"});
    }
    else {
        for (var x = 0; x < ingredients.length; x++) {
            var temp = ingredients[x];
            if(temp.id === ingredient.id) {
                res.status(500).send({error: "Ingredient already exist, please input new id"});
            }
        }
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
});

//replace ingredient with different item
app.put('/ingredients/:ingredientId', function(req,res) {
    var ingredientId = req.params.ingredientId;
    var newText = req.body.text;

    if(!newText || newText === "") {
        res.status(500).send({error: "Must Provide Ingredient Text"});
    }
    else {
        var objectfound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var temp = ingredients[x];
            objectfound = true;

            if (temp.id === ingredientId) {
                ingredients[x].text = newText; 
                break;
            }
            else {
                objectfound = false;
            }
        }
        if (objectfound === false) {
            res.status(500).send({error:"Ingredient id not found"});
        }
        else {
            res.send(ingredients);
        }
    }
});

//if id is not provided, error is thrown
app.delete('/ingredients/', function(req,res) {
    res.status(500).send({error: "Must Provide Ingredient id in url"});
});

//if id is provided, checks if valid, deletes if id is valid
app.delete('/ingredients/:ingredientId', function(req,res) {
    var ingredientId = req.params.ingredientId;

    var objectfound = false;
    for (var x = 0; x < ingredients.length; x++) {
        var temp = ingredients[x];
        objectfound = true;

        if (temp.id === ingredientId) {
            ingredients.pop(temp);
            break;
        }
        else {
            objectfound = false;
        }
    }
    if (objectfound === false) {
        res.status(500).send({error:"Ingredient id not found"});
    }
    else {
        res.send(ingredients);
    }
});

//port 3000
app.listen(3000, function() {
    console.log("Running on port 3000");
});