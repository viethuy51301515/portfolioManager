const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExperienceSchema = new Schema({
    company:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
});

module.exports = Experience = mongoose.model("experience",ExperienceSchema);