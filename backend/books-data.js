// Alternative seed script using the API endpoint
// This requires the backend server to be running and you to be logged in

const axios = require('axios');

const sampleBooks = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishYear: 1960,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg"
    },
    {
        title: "1984",
        author: "George Orwell",
        publishYear: 1949,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publishYear: 1813,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishYear: 1925,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publishYear: 1951,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg"
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        publishYear: 1997,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publishYear: 1937,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg"
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        publishYear: 1954,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg"
    },
    {
        title: "Animal Farm",
        author: "George Orwell",
        publishYear: 1945,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1424037542i/170448.jpg"
    },
    {
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        publishYear: 1950,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032875i/11127.jpg"
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        publishYear: 1932,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        publishYear: 1988,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg"
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        publishYear: 2003,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg"
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        publishYear: 2008,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg"
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        publishYear: 2011,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg"
    },
    {
        title: "Educated",
        author: "Tara Westover",
        publishYear: 2018,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        publishYear: 2018,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
    },
    {
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        publishYear: 2016,
        imageURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg"
    }
];

console.log('Sample books data ready!');
console.log('Copy this array and use it in your application or wait for the database connection to be stable.');
console.log(JSON.stringify(sampleBooks, null, 2));
