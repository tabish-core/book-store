import express from 'express';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

// Route for Uploading Image
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    const imageURL = `http://localhost:5555/uploads/${req.file.filename}`;
    res.status(200).send({ imageURL });
});


//Route for saving a new book
router.post('/', verifyToken, async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            imageURL: request.body.imageURL,
            userId: request.userId,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all the books from db
router.get('/', async (request, response) => {
    try {
        // Optional auth: if token present, show only that user's books
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let books;
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                console.log('[GET /books] Authenticated user:', decoded.id);
                books = await Book.find({ userId: decoded.id });
            } catch (err) {
                console.log('[GET /books] Invalid token');
                return response.status(401).send({ message: 'Invalid token' });
            }
        } else {
            // No token — show all public books (those without a userId)
            console.log('[GET /books] No token, showing public books');
            books = await Book.find({ userId: { $exists: false } });
        }

        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }

});


// Route for getting 1 book from db by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }

});


// Route for updating a book
router.put('/:id', verifyToken, async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });

        }
        return response.status(200).send({ message: 'Book updated Succesfully' });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for deleting a book
router.delete('/:id', verifyToken, async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;