const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs')
const { url } = require("inspector");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const { registerPartial } = require('hbs');
const DB = 'mongodb+srv://Rounok:rounok@12345@cluster0.yt3z5.mongodb.net/MERN?retryWrites=true&w=majority'
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
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



app.get("/", (req,res)=>{
    res.render('index')
});

app.get("/login", (req,res)=>{
    res.render('login.hbs')
});

app.get("/register", (req,res)=>{
    res.render('register.hbs')
});

app.post("/register", (req, res)=>{ 
    let form = new valid(req.body);
    form.save().then(()=>{
        res.status(201).render('index.hbs');
    }).catch(()=>{
        res.status(400).send("<h1>The data is not stored<h1>");
    })
});

app.post("/login", async(req, res)=>{
    try {
        const emails = req.body.emails;
        const passwords = req.body.passwords;

        const useremail = await valid.findOne({emails:emails});
        if(useremail.passwords === passwords){
            res.status(201).render('index.hbs');
        }
        else{
            res.status(400).send("Password are not matching!!");
        }
      
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
});

app.listen(port, ()=>{
    console.log("Server is running at port number", port);
});