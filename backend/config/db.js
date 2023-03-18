const mongoose = require('mongoose')
const database= async(res)=>{
    try{
        const url = process.env.DB_URL
        const database_connection = await mongoose.connect(url)
        console.log("database is connected successfully")

    }
    catch(err){
        console.log(err)

    }
}
module.exports = database