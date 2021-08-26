const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({

    name : {
        type : String
    },
    colors : [{
        type : String
    }],
    owner : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }


},{
    timestamps: true
});

module.exports = mongoose.model('Color', ColorSchema);