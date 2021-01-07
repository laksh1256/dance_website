const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const bodyparser = require("body-parser");
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });
  const Contact = mongoose.model('Kitten', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
})
app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact.pug');
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
});
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});