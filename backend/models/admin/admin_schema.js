const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name : { type : String , required : true},
    email : {type : String , required : true,unique:true},
    password : {type :String , required:true},
    mobile : {type : String , required : true,unique:true},
    company_name : {type : String , required : true},
    website_url : {type : String , required : true},
    token : {type : String},
    expiredAt : {type : Date , default : Date.now() + 1000*60*30}

})
module.exports = mongoose.model('admin' , schema)