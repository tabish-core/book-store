import dns from "node:dns/promises";
try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (error) {
    console.log("Could not set custom DNS servers");
}


import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads'));
// Middleware for handling CORS Policy (Custom Origins)
// app.use(
//     cors({
//         origin: 'http://localhost:5713/',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-type'],
//     })
// );


import authRoute from './routes/authRoute.js';



// Vercel / Serverless Database Connection
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(MONGODBURL);
        console.log(`App connected to MONGO DB`);
    } catch (error) {
        console.error("DB Connection Failed", error);
    }
};

// Ensure DB is connected for every request (Serverless) - MUST BE BEFORE ROUTES
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.get('/', (request, response) => {
    return response.status(200).send(`Hi Tabish!`)
});

app.use('/books', booksRoute);
app.use('/auth', authRoute);

// Start Server (Local Only)
if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${PORT}`);
        });
    });
}

export default app;

