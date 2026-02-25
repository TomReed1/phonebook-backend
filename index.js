const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const personNumber = persons.length
  const requestTime = new Date()

  res.send(`<p>The phonebook has ${personNumber} people</p>
    <p>${requestTime}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const foundPerson = persons.find((person) => person.id === id)

  if (foundPerson === undefined)
    return res.status(404).end()

  res.json(foundPerson)
})

app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)

persons = persons.filter((person) => person.id !== id) 

res.status(204).end()
})

app.post ('/api/persons', (req, res) => {

  const id = Math.floor(Math.random() * 200000)
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'Name or Number missing' 
  })}

  existingName = persons.find((person) => person.name === body.name)

  if (existingName) {
    return res.status(400).json({ 
      error: 'Name is already in Phonebook' 
  })

  }

  const person = {
    name: body.name, 
    number: body.number,
    id: id
  }

  persons = persons.concat(person)
  res.json(person)

}) 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
