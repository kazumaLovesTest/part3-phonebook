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

const errorHanler= (error,reqquest,response,next) =>{
  console.error(error.message)

  if (error.name === 'CastError')
      return response.status(400).send({error:'malformed id'})
  else if(error.name === 'ValidationError')
      return response.status(400).json({ error: error.message })
  next(error)
}
const unkownEndpoint = (request,response) =>{
  return response.status(404).send({error:"unkonw endpoint"})
}
app.get('/api/persons',(request,response)=>{
    Person.find({}).then(result =>{
      response.json(result)
    })
})

app.get('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    console.log(id)
    Person.findById(id)
          .then(person =>{
            if (person)
              response.json(person)
            else
              response.status(404).end()
            })
          .catch(error => next(error))   
  })
  
app.delete('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    Person.findByIdAndDelete(id)
          .then(deletedPerson =>{
            response.status(204).end()
          })
          .catch(error =>{
            next(error)
          })
  })

app.post('/api/persons',(request,response,next)=>{
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
  newPerson.save()
           .then(savedPerson =>{
             response.json(savedPerson)
            })
          .catch(error => next(error))  
})

app.put('/api/persons/:id',(request,response,next)=>{
  const body = request.body
  if(!body.name || !body.number)
  {
    return response.status(400).json({
      error:'missing content'
    })  
  }
  const newPerson = {
    name:body.name,
    number:body.number
  }
  // Person.findByIdAndUpdate(request.params.id,newPerson, {new:true})
  //       .then(updatedPerson => {
  //         response.json(updatedPerson)
  //       })
  //       .catch(error => next(error))
  Person.findOneAndUpdate({_id:request.params.id},newPerson,{runValidators:true,new:true})
        .then(updatedPerson =>{
          response.json(updatedPerson)
        })
        .catch(error => next(error))
})
app.use(unkownEndpoint)
app.use(errorHanler)
const Port = process.env.PORT || 3001
app.listen(Port, ()=>{
    console.log(`Listening at port: ${Port}`)
})

const gernerateRandomId = () =>{
  const max = Number.MAX_SAFE_INTEGER
  return Math.random() * (max - 1) + 1
}
