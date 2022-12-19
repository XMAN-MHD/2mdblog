/* 
    controller
*/
module.exports = (req, res) =>{
    if(req.session.userId) // check the user is logged in
    {
        let usernameField = "";
        let titleField = "";
        let bodyField = "";

        let formDatas = req.flash('datas')[0];
        if(typeof formDatas != "undefined")
        {
            usernameField = formDatas.username;
            titleField = formDatas.title;
            bodyField = formDatas.body;
        }

        return res.render("create",
            {
                imgErrors: req.flash('imgErrors'), 
                errors: req.flash('errors'),
                username: usernameField, 
                title: titleField,
                body: bodyField, 
                createPost: true
            }
        );
    }
    // user not logged in
    res.redirect('/auth/login')
}