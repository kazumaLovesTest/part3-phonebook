const { request, response } = require('express')
const express = require('express')
const res = require('express/lib/response')

const app =  express()

const phoneBook = [
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
    response.json(phoneBook)
})

app.get('/info',(request,response)=>{
    const dateOfRequestSent = new Date();
    response.send(`<div>PhoneBook has ${phoneBook.length} Persons</div> ${dateOfRequestSent} <div> `)
})

app.get('/api/persons/:id',(request,response)=>{
    const id =  request.params.id
    const person = phoneBook.find(note =>note.id == id)
    if (person)
      response.json(person)
    else
      response.status(404).end()
})

const Port = 3001
app.listen(Port, ()=>{
    console.log(`Listening at port: ${Port}`)
})