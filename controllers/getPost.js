/* 
    import modules
*/
const blogPost = require('../models/blogPost.js');
const { populate } = require('../models/users.js');
/* 
    controller
*/
module.exports = async (req,res)=>{  
    const blogposts = await blogPost.findById(req.params.id).populate('userId')
    res.render('./post',{blogposts})
}