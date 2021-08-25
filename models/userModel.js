const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongo = require('passport-local-mongoose');


const UserSchema = new Schema({

    email : {
        type:String
    },
    colors :[{
        type: Schema.Types.ObjectId,
        ref : 'Color'
    }]

},{
    timestamps: true
});


UserSchema.plugin(passportLocalMongo);

module.exports = mongoose.model('User', UserSchema);