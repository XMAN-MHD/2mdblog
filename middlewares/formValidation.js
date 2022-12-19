/*
    my custom middlewares
*/
const validateFormMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.body == null || req.body.username == null)
    {
        return res.redirect('/posts/new')
    }
    next()
}

module.exports = validateFormMiddleWare;

