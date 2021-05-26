const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        //mongo connection
        const connection = await mongoose.connect(process.env.MONGO_URL);
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;