const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs')
const { url } = require("inspector");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/youtube', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;


//MONGOOSE RELATED STUFF
const validSchema = new mongoose.Schema({  // Creating instance of Schema and defining it
    names : String,
    phones : Number,
    emails : String,
    passwords : String
});


const valid = new mongoose.model("valid",validSchema); // Creating collections or model

//Express Specific stuff
app.use('/static', express.static('../static'))
app.use(express.urlencoded());



// Hbs Specific stuff
app.set("view engine", "hbs")
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));



app.post("/", (req, res)=>{ 
    let form = new valid(req.body);
    form.save().then(()=>{
        res.render('index.hbs');
    }).catch(()=>{
        res.status(400).send("<h1>The data is not stored<h1>");
    })
});
app.get("/", (req,res)=>{
    res.render('index')
});
app.get("/login", (req,res)=>{
    res.render('login.hbs')
});
app.get("/register", (req,res)=>{
    res.render('register.hbs')
});

app.listen(port, ()=>{
    console.log("Server is running at port number", port);
});