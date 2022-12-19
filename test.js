const mongoose = require('mongoose');
const express = require('express');
const app = express();
const blogPost = require('./models/blogPost')
mongoose.connect(
    'mongodb://localhost:27017/my_database', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (e) => {
        if (e) {
            console.log(e)
        } else {
            console.log('connected to mongoDB')
        }
    }   
);

blogPost.create({
title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
body: `If you have been here a long time, you might remember when I went on ITV Tonight to
dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money
topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery
opens up. You know those bullet-point lists. You start spotting them everything at this time of year.
They go like this:`
}, (error, blogpost) =>{
console.log(error,blogpost)
})
blogPost.create(
    {
        title:'A day in my life', 
        body: 'Hello guys welcome to my life this is what I do everyday.'
    },
    (error, blogpost) =>{
        console.log(error, blogpost)
    } 
)
app.listen(4000, (e) => {console.log('app lisetening on port 4000')})
