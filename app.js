//// Connecting to DB////
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
}

// Creating a schema (similar to collection)
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No Name Specified!!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Creating a model under the schema//
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 5,
    review: "Apple as a fruit."
});

// fruit.save();

// const berry = new Fruit({
//     name: "berry",
//     rating: 4,
//     // review: "Most delicious fruit."
// })
// berry.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37,
    // favouriteFruit: mango
});

// person.save();

// Person.updateOne({ name: "John" }, { favouriteFruit: mango })
//     .then(() => {
//         console.log("Successfully added mango.");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
});

const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weird texture"
});

// Fruit.insertMany([kiwi, orange, banana]).then(function () {
//     console.log("Successfully saved all the fruits to fruitsDB.");
// }).catch(function (err) {
//     console.log(err);
// });
Fruit.deleteMany({ name: "berry" })
    .then(() => {
        mongoose.connection.close();
        console.log("Successfully Deleted all fruits named Berry");
    })
    .catch((err) => {
        console.log(err);
    });
Fruit.find()
    .then((fruits) => {
        fruits.forEach(fruit => {
            // mongoose.connection.close();
            console.log(fruit.name);
        })
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        setTimeout(() => {
            mongoose.connection.close();
        }, 10);
    });

// Fruit.updateMany({ name: "berry" }, { review: "Berry fruit" })
//     .then(() => {
//         console.log("Successfully Updated");
//     })
//     .catch((err) => {
//         console.log(err);
//     });


// Fruit.deleteOne({ name: "Peach" })
//     .then(() => {
//         console.log("Successfully Deleted");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Person.deleteMany({ name: "John" })
//     .then(() => {
    //         mongoose.connection.close();
    //         console.log("Successfully Deleted All Data named JOHN");
    //     })
    //     .catch((err) => {
        //         console.log(err);
        //     });
