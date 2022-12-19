/*
    import modules
*/ 
const mongoose = require('mongoose');
const Users = require('./users');
/*
    create a schema for the blogposts of the website
*/ 
const Schema = mongoose.Schema; // import the Schema Object Constructor for creating a new schema 
const BlogPostSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: Users, required:true },
    title: { type: String, required:  [true,'Please provide title'] },
    body: { type: String, required:  [true,'Please provide body'] }, 
    datePosted: {type:Date, default:new Date()},
    image: { type: String, required:  [true,'Please provide image'] }
});
/*
    create a collection for the blogposts of the website 
*/ 
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
/*
    export the BlogPost collection
*/ 
module.exports = BlogPost
