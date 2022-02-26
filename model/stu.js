const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

//هنا ننشئ حقول 
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
});
schema.methods.validPassword =function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("studata",schema)