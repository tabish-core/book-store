import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,

        },
        publishYear: {
            type: Number,
            required: true,
        },
        imageURL: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }
    },
    {
        timestamps: true,

    }
);

export const Book = mongoose.model('Book', bookSchema);