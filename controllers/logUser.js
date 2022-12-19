/* 
    import modules
*/
//packages
const bcrypt = require('bcrypt');
const User = require('../models/users');
/* 
    controller
*/
module.exports = (req, res) =>
{
    const { username, password } = req.body;
    User.findOne( // request for the user using its username
        {username:username}, 
        (error,user) => {
            // if user found we check the password 
            if(user)
            {
                bcrypt.compare(
                    password, 
                    user.password, 
                    (error, same) => {
                        if(same)
                        { // if passwords match we start a session for the user
                            req.session.userId = user._id;
                            res.redirect('/');
                        }
                        else
                        {
                            req.flash('errors', 'Username or Password invalid')
                            res.redirect('/auth/login')
                        }
                    }
                )
            }
            else
            {
            req.flash('errors', 'Username or Password invalid')
            res.redirect('/auth/login');
            }
        }
    )
}
