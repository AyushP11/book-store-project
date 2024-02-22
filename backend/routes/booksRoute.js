import express from 'express'
import { BookModel } from '../models/bookModel.js'

const router = express.Router()

// route for saving a new book
router.post('/', async (req, res) => {
  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({message: "send all required fields: title, author, publishYear"})
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await BookModel.create(newBook)
    return res.status(201).send(book)
  } catch (error) {
    console.log("error while saving new book")
    console.log(error.message)
    res.status(500).send({message: error.message})
  }
})

// get all books from database
router.get('/', async (req, res) => {
  try {
    const allBooks = await BookModel.find({})
    return res.status(200).json(allBooks)
  } catch (error) {
    console.log("error while fetching all books")
    console.log(error.message)
    res.status(500).send({message : error.message})
  }
})

// get one book by id
router.get('/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const book = await BookModel.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message})
  }
})

// update book by id
router.put('/:id', async(req, res) =>{
  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({message: "send all required fields: title, author, publishYear"})
    }
    const {id} = req.params;
    const result = await BookModel.findByIdAndUpdate(id, req.body)

    if(!result) {
      return res.status(404).json({message: 'book not found'})
    } 
    return res.status(200).send({message: "book updated successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message})
  }
})

// delete book by id
router.delete('/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const result = await BookModel.findByIdAndDelete(id)

    if(!result) {
      return res.status(404).json({message: 'book not found'})
    } 
    return res.status(200).send({message: "book deleted successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message})
  }
})

export default router;