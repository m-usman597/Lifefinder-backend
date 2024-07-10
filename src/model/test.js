const {Schema, default: mongoose} = require('mongoose');

const TestSchema = new Schema({

    Name: {type:String, required:true},
    Type: {type:String, required:true},
    Powers:{type:String, required:true}
});

const Test = mongoose.model("test", TestSchema);
module.exports = Test;