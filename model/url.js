const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
    originalurl: {
        type: String,
        required : true,
    },
    shorturl: {
       type : String,
       default: () => shortid.generate(),
       required : true,
       unique : true,
    },
    clicks: {
        type : Number,
        default : 0,
    }


});

module.exports = mongoose.model('Url' , urlSchema);