const axios = require('axios')
const express = require('express')
const app = express()

const BASE_URL = `https://storage.googleapis.com/storage/v1/b/${process.env.BUCKET}/o/`

app.use((request, response) => {
  const path = request.path.slice(1)  //omit leading slash
  const objectURL = BASE_URL + encodeURIComponent(path) + "?alt=media"
  
  axios.get(objectURL, { responseType: 'stream' })
    .then(res => {
      console.log(res.headers)
      response.header(res.headers)
      res.data.pipe(response)
    })
    .catch(e => {
      response.status(404).end('Not found')
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('cdn server started at', port))
