const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://saifkhan77806:saifkhan@cluster0.eaebt.mongodb.net/").then(()=>{
    console.log("database connected !")
}).catch((err)=>{
    console.log(err)
})