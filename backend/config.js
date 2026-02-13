import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5555;

export const MONGODBURL = process.env.MONGODBURL;

export const JWT_SECRET = process.env.JWT_SECRET;
