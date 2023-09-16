const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000
const filePath = __dirname + '/links.json'

app.get('/', (req, res) => {
  res.sendFile(filePath)
})
app.post('/save', (req, res) => {
  const jsonData = req.body // Assuming you're sending JSON data in the request body

  // Define the file path where you want to save the JSON data

  // Use the `fs.writeFile` method to save the JSON data to the file
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
    if (err) {
      console.error('Error writing JSON file:', err)
      res.status(500).send('Error writing JSON file')
    } else {
      res.status(200).send('JSON data saved to file successfully')
    }
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
