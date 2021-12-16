require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require(`./models/person`)

const app =  express()


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(result =>{
      response.json(result)
    })
})

app.get('/info',(request,response)=>{
    const dateOfRequestSent = new Date();
    response.send(`<div>PhoneBook has ${phoneBook.length} Persons</div> ${dateOfRequestSent} <div> `)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    console.log(id)
    Person.findById(id).then(person =>{
      if (person)
        response.json(person)
      else
        response.status(404).end()
    })   
  })

app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    Person.findByIdAndDelete(id)
          .then(deletedPerson =>{
            response.status(204).end()
          })
          .catch(error =>{
            console.log(error)
          })
    
})

app.post('/api/persons',(request,response)=>{
  const body = request.body
  console.log(body.content)
  if(!body.name || !body.number)
  {
    return response.status(400).json({
      error:'missing content'
    })  
  }
  const newPerson = new Person({
     name:body.name,
     number:body.number,
     id:gernerateRandomId(),
     date: new Date(),
     important:true
  })
  console.log(newPerson)
  newPerson.save().then(savedPerson =>{
    response.json(savedPerson)
  })
})

const Port = process.env.PORT || 3001
app.listen(Port, ()=>{
    console.log(`Listening at port: ${Port}`)
})

const gernerateRandomId = () =>{
  const min = phoneBook.length
  const max = Number.MAX_SAFE_INTEGER
  return Math.random() * (max - min) + min
}
const isInPhonebook = (name) => {
  return phoneBook.find(person => person.name === name)
}