//Parameters
//import fs from "fs";
//import express from "express";
const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.API_PORT || 80;
const API = require('./Middleware/apikeys');
//import {validateKey}  from './Middleware/apikeys.js';
app.use(express.json());

// Temporal Data
/*const associates = [
    {ID_Associate: 111111111111, fLastName: 'Herrera', mLastName: 'Cardenas', Name: 'Diego', Credit: 0 ,  associate: true},
    {ID_Associate: 222222222222, fLastName: 'Lozano', mLastName: 'Rubio', Name: 'Andres', Credit: 111111111.00, associate: false},
    {ID_Associate: 333333333333, fLastName: 'Delgado', mLastName: 'Vazquez', Name: 'Monica', Credit: 999999999.00, associate: true},
];*/

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch(error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
}

readData();

//Root
app.get('/', (req, res)=>{
    
    res.send('Priceshoes JS API!!')

});

app.get('/api/associates', API.validateKey, (req,res)=>{

    const data = readData();
    //res.send(associates);
    //res.json(data.associates);
    res.status(200).json(data.associates);

});

//Get Associate by ID
app.get('/api/associates/:ID_Associate', API.validateKey, (req, res)=>{
    const data = readData();
    const id = parseInt(req.params.ID_Associate);
    const associate = data.associates.find((associate) => associate.ID_Associate === id);

    //const associate = associates.find(c => c.ID_Associate === parseInt(req.params.ID_Associate));
    if(!associate) return res.status(404).send('Associate NOT found');
    else res.status(200).send({
        data: associate,
      });/*res.send(associate);*/

});

/*
//Get Associates
app.get('/api/associates', (req,res)=>{

    const data = readData();
    //res.send(associates);
    res.json(data.associates);

});

//Get Associate by ID
app.get('/api/associates/:ID_Associate', (req, res)=>{
    const data = readData();
    const id = parseInt(req.params.ID_Associate);
    const associate = data.associates.find((associate) => associate.ID_Associate === id);

    //const associate = associates.find(c => c.ID_Associate === parseInt(req.params.ID_Associate));
    if(!associate) return res.status(404).send('Associate NOT found');
    else res.send(associate);
});
*/

// The resource does not exist
app.all('*',(req,res,next)=>{

    // res.status(404).json({
    //     status: 'fail',
    //     message: `Cant find ${req.originalUrl} on the server`
    // });

    res.status(404).send(`Cant find ${req.originalUrl} on the server`);

});


app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    
});

//Listen through port 4444
app.listen(port, function (err) {
    if (err) {
      console.error('Failure to launch server');
      return;
    }
    console.log(`Listening on port ${port}`);
  });
//app.listen(port,()=>console.log(`Escuchando en puerto ${port}...`));