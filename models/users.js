/*
    import modules
*/ 
// packages
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator');
/*
    create a schema for the users of the website
*/ 
const Schema = mongoose.Schema; // import the Schema Object Constructor for creating a new schema 
const UserSchema = new Schema({
    username: {type: String, required:  [true,'Please provide username'], unique: [true,'username exists already']},
    password: {type: String, required: [true,'Please provide password']}
});
/*
    handle duplicates errors of the user model
*/ 
UserSchema.plugin(uniqueValidator);
/*
    before saving anything into our users collection(table) lets perform some treatments by using the pre() of the schema
*/ 
    UserSchema.pre(
        'save', 
        function(next) 
        {
            const user = this;
            bcrypt.hash(
                user.password, 
                10, 
                (error, hash) => 
                {
                    console.log(error);
                    user.password = hash;
                    next();
                }
            )
        }
    )
    
/*
    create a collection for the users of the website 
*/ 
const Users = mongoose.model('Users',UserSchema);
/*
    export the users collection
*/ 
module.exports = Users