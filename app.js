const express = require("express");
const path = require("path");
const bodyparser = require('body-parser');
const app = express();
var mongoose = require('mongoose');

port = 80
const contactSchema = new mongoose.Schema({
    nam: String,
    age: String,
    gender: String,
    phone: String,
    more: String,
});

//moodel for mongoose 
const Contact = mongoose.model('origindance', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/templates', express.static('templates')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory






app.get('/', (req, res) => {
    // const params = { }
    res.status(200).render('home.pug');
})


app.get('/contact', (req, res) => {
    console.log(req, res)
    // const params = { }
    res.status(200).render('contact.pug');
})


app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send(`This item has been saved to the database`)
    }).catch(() => {
        res.status(400).send(`item was not saved to the databse`)})
})

    //connection with mongose

    mongoose.connect('mongodb://localhost/nitintiwarii', { useNewUrlParser: true, useUnifiedTopology: true });




    //making schema for database


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})