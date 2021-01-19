const express=require('express');
const path=require('path')
const fs=require('fs')
const app=express();
const port=80;
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ddacontactform', {useNewUrlParser: true, useUnifiedTopology: true});

// defining mongoose schema

const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    emnail: String,
    address: String,
    desc: String


  })

const contact = mongoose.model('contact', contactschema);


// express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())





// pug specific stuff
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')

// endpoint 
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    
    res.status(200).render('contact.pug');
})

app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
       res.status(400).send("item was not saved to the database")

    })
    // res.status(200).render('contact.pug');
})

app.get('/about',(req,res)=>{
    
    res.status(200).render('about.pug');
})

app.get('/services',(req,res)=>{
    
    res.status(200).render('services.pug');
})



// start server
app.listen(port,()=>{
    console.log(`server successfully started on port:${port}`);
})