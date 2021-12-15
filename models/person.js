const mongoose  = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
        .then(response =>{
            console.log("connection established with",url)
        })
        .catch(error =>{
            console.log("couldnt connect because of" , error)
        })
const personSchema = mongoose.Schema({
    name:String,
    number:Number,
    date:Date,
    important:Boolean,
})
personSchema.set(`toJSON`,{
    transform:(document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports =  mongoose.model(`Person`, personSchema)

