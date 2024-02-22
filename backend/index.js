import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import { BookModel } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()
// middleware for parsing request body
app.use(express.json())

// middleware for handling CORS policy
// option1 : allow all origins with default of cors(*)
app.use(cors());
// option2 : allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get('/', (req, res) => {
  // console.log("get req")
  console.log(req)
  return res.status(200).send('welcome to book store')
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
.then(() => {
  console.log('db is connected')
  app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
  })
  
})
.catch((error) => {
  console.log(error)
})
