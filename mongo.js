const { get } = require('express/lib/response')
const mongoose  = require('mongoose')

const send = (person) => {
    person.save().then(result =>{
        console.log(`${person.name} saved!`)
        mongoose.connection.close()
    })
}
const getAll = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length < 3)
{
    console.log('Please provide password')
    process.exit(1)
}
else if (process.argv.length > 5)
{
    console.log('too many args')
    process.exit(1)
}


const password = process.argv[2]
const url = `mongodb://kazumaNeet:${password}@cluster0-shard-00-00.yxhbb.mongodb.net:27017,cluster0-shard-00-01.yxhbb.mongodb.net:27017,cluster0-shard-00-02.yxhbb.mongodb.net:27017/phoneBook?ssl=true&replicaSet=atlas-spryfx-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number:Number,
    date:Date,
    important:Boolean,
})

const Person = mongoose.model(`Person`, personSchema)

if (process.argv.length > 3){
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
        name:newName,
        number:newNumber,
        date:new Date(),
        important:true,
    })
    send(person)
}
else {
    getAll()
}

