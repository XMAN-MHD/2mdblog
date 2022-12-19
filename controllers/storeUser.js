/* 
    import modules
*/
// files
const usersModel = require('../models/users.js');
/* 
    controller
*/
module.exports = (req,res)=>{
    usersModel.create(
        req.body, 
        (error, user) => 
        {   
            if(error)
            {
                const validationErrors = Object.keys(error.errors).map(key => {return error.errors[key].message});
                req.flash('errors', validationErrors);
                req.flash('data',req.body)
                return  res.redirect('/auth/register');
            }
            res.redirect('/');
        }
    )
        
}   