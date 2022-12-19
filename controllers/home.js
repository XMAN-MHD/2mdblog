/* 
    import modules
*/
const blogPost = require('../models/blogPost.js');
/* 
    controller
*/
module.exports = async (req, res) => {
    const blogposts = await blogPost.find({}).populate('userId'); // retrieve all the records of blogpost collection(table) and populate each record with the data of the current user 
    res.render('./index', {blogposts}) // render the index.ejs view as a response and give it access to the blogpost records as an array
}