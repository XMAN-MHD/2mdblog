/* 
    controller
*/
module.exports = (req, res) =>{
    console.log(req.flash('svErrors'))
    res.render(
        'login', // render login.ejs
        {
            dbErrors: req.flash('errors'),
            svErrors: emptyFields
        }
    ) 
}