const mongoose  = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url)
        .then(response =>{
            console.log("connection established with",url)
        })
        .catch(error =>{
            console.log("couldnt connect because of" , error)
        })
const personSchema = mongoose.Schema({
    name:{
      type:String,
      minLength:[5,'Must be length of atleast 5}'],
      unique:true,
      required:true
    },
    number:{
      type:String,
      minLength:[8,'Must be length of atleast 5'],
      required:true
    },
    date:{
        type:Date,
        required:true
    },
    important:Boolean,
})
personSchema.plugin(uniqueValidator)
personSchema.set(`toJSON`,{
    transform:(document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports =  mongoose.model(`Person`, personSchema)

