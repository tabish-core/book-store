import express from 'express';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Multer — use memory storage (no disk writes, compatible with serverless)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    }
});

// Route for Uploading Image (streams buffer to Cloudinary)
router.post('/upload', verifyToken, (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send({ message: 'File too large. Maximum size is 5MB.' });
            }
            return res.status(400).send({ message: err.message || 'Upload failed' });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        try {
            // Upload buffer directly to Cloudinary via a stream
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'book-store', resource_type: 'image' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            res.status(200).send({ imageURL: uploadResult.secure_url });
        } catch (cloudinaryError) {
            console.error('Cloudinary upload error:', cloudinaryError);
            res.status(500).send({ message: 'Image upload to cloud failed' });
        }
    });
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