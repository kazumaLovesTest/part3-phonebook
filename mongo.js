const mongoose = require('mongoose')

const send = (person) => {
  person.save().then(() => {
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

const create = () => {
  // eslint-disable-next-line no-undef
  const newName = process.argv[3]
  // eslint-disable-next-line no-undef
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
    date: new Date(),
    important: true,
  })
  return person
}


// eslint-disable-next-line no-undef
const inputLength = process.argv.length
if (inputLength < 3) {
  console.log('Please provide password')
  // eslint-disable-next-line no-undef
  process.exit(1)
}
else if (inputLength > 5) {
  console.log('too many args')
  // eslint-disable-next-line no-undef
  process.exit(1)
}


// eslint-disable-next-line no-undef
const password = process.argv[2]
const url = `mongodb://kazumaNeet:${password}@cluster0-shard-00-00.yxhbb.mongodb.net:27017,cluster0-shard-00-01.yxhbb.mongodb.net:27017,cluster0-shard-00-02.yxhbb.mongodb.net:27017/phoneBook?ssl=true&replicaSet=atlas-spryfx-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

if (inputLength > 3) {
  const person = create()
  send(person)
}
else {
  getAll()
}

