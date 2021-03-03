const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
    },

    pasword:{
        type:String,
        required:true,
    }
});

module.exports = User = mongoose.model('user',UserSchema);