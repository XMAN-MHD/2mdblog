/* 
    import modules
*/
// packages
const path = require('path');
// files
const blogPost = require('../models/blogPost.js');
/* 
    controller
*/
module.exports = (req,res)=>{
    if(req.files != null)
    {
        let handler = req.files.image; // get the Uploaded image with handler 
        handler.mv(path.resolve(__dirname,'../public/assets/img',handler.name),
        async()=>{
            await blogPost.create({...req.body, image: 'assets/img/'+handler.name, userId: req.session.userId},(error) =>{
                if(error)
                {
                    const validationErrors = Object.keys(error.errors).map(key => {return error.errors[key].message});
                    req.flash('errors',validationErrors);
                    req.flash('datas',req.body);
                    return res.redirect('/posts/new');
                }
                res.redirect('/');
            }) 
        }
        )
    }
    else
    {
        req.flash('datas', req.body);
        req.flash('imgErrors', 'Please provide image');
        res.redirect('/posts/new');
    }
    
}