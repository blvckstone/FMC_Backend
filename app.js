const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/personDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({ //this should be capitalize of first letter
    name: String, 
    rating: Number,
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema); //Fruit is the name of collection (Singular)

const pineapple = new Fruit ({
    name: "Pineapple",
    rating: 6,
    review: "Tasty & Yummy"
})

pineapple.save(); //"this will add apples everytime when we run this script so comment it out"


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})


const Person = new mongoose.model("Person", personSchema);


const person = new Person({
    name: "amy",
    age: 12,
    favoriteFruit: pineapple
})

person.save()


//created by your own to find all items inside collections
Fruit.find({}).then(
    function(data){
        // console.log(data)
        // mongoose.connection.close();
        data.forEach(function(element){console.log(element.name)})
    }).catch(
        function(err){
            console.log(err)
        });

  

