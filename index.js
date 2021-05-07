const express = require('express')
const app = express()

let persons = [
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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const total = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

