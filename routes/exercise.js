// Whenever we find the right API edit the code accordingly

const express = require('express');
const router = express.Router();
require('dotenv').config({path: '../.env'});

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
const API_URL = process.env.API_URL;

let Exercise = require('../models/exercise.model');

// Handle POST /exercise/
router.post('/', (req, res) => {
    console.log("POST /exercise/");
    let request_body = req.body;


    const exercise = new Exercise({
        exercise_name: request_body.exercise_name,
        duration: request_body.duration,
        date: new Date(),
        user_id: request_body.user_id
    });

    exercise.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=> {
        console.log(err);
        res.send(err);
    })

});

//Handle GET /exercise/   (returns all exercise)
router.get('/',async (req,res) => {
    console.log("GET /exercise/");
    
    let user_id = req.query.user_id;
    let date = req.query.date;

    const filter_body = {}

    if (user_id) {
        filter_body.user_id = user_id;
    }
    if (date) {
        filter_body.date = {
            $gte: date + 'T00:00:00.000Z',
            $lte: date + 'T23:59:59.999Z'
        }
    }

    // Get all meals from the database that satisfy the query
    Exercise.find(filter_body, (err, exercises) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(exercises);
    })
    

});

//Handle DELETE /exercise/ (Deletes a exercise INPUT PROVIDED:exercise_id)
router.delete('/',async (req, res) => {
    console.log("DELETE /exercise/");
    const request_body = req.body;
    
    // Delete the meal from the database
    Exercise.deleteOne({_id: request_body.exercise_id}, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({
            message: 'Exercise deleted!'
        });
    });
}); 

//Handle PUT /exercise/ (Updates a exercise INPUT PROVIDED:exercise_id and whatever needs to be updated) 
router.put("/:id", (req, res, next) => {
    let request_body = req.body;
    return Exercise.updateOne(
      { exercise_id: req.params.id },  // <-- find stage
      { $set: {                // <-- set stage
        exercise_id: request_body.exercise_id,
        exercise_name: request_body.title,
        duration: request_body.duration,
        } 
      }   
    ).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });


module.exports = router;