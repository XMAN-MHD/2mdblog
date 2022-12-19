//declare global variable
global.emptyFields = false;
/*
    my custom middlewares
*/
const toLoginValidation = (req,res,next)=>{
    if(req.body.username == '' || req.body.password == '')
    {
        emptyFields = 'Please provide Username and Password';
        return res.redirect('/auth/login');
    }
    next()
}

module.exports = toLoginValidation;