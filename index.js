const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

app.use(express.json())
app.use(morgan('tiny'))

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "562-123-4561",
      },
      {
        id: 2,
        name: "Ada Lovelace",
        number: "626-998-7546"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "310-876-1242"
      },
      {
        id: 4,
        name: "Mary Poppendist",
        number: "714-412-3874"
      }
]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else if (notes.find(note => note.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    notes = notes.concat(note)
    
    response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const total = notes.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

