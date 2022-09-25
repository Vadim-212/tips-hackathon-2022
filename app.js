const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.get('/tips/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/tips-page.html'))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))
