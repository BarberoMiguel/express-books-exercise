const express = require('express')
const books = require('./data/books.json');

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the library");
});

app.get("/all", (req, res) => {
    res.status(200).json(books);
});

app.get("/first", (req, res) => {
    res.status(200).json(books[0]);
});

app.get("/last", (req, res) => {
    res.status(200).json(books[books.length - 1]);
});

app.get("/middle", (req, res) => {
    res.status(200).json(books[50]);
});

app.get("/author/:author?", (req, res) => {
    let author = req.params.author;
    let mayuscula = true;
    let string = "";
    for (let i = 0; i < author.length; i++) {
        if (mayuscula) {
            string += author[i].toUpperCase();
            mayuscula = false;
        } else if (author[i] == "-") {
            string += " ";
            mayuscula = true;
        } else {
            string += author[i];
        }
        
    }
    const book = books.find(book => book.author === string);
    
    if (book != "") {
        res.status(200).json(book.title);
    } else {
        res.status(200).json({
            message:"no hay libros de ese autor",
            success: false,
        })
    }
});

app.get("/country/:author?", (req, res) => {

    let author = req.params.author;
    let mayuscula = true;
    let string = "";
    for (let i = 0; i < author.length; i++) {
        if (mayuscula) {
            string += author[i].toUpperCase();
            mayuscula = false;
        } else if (author[i] == "-") {
            string += " ";
            mayuscula = true;
        } else {
            string += author[i];
        }
        
    }
    const book = books.find(book => book.author === string);
    
    if (book != "") {
        res.status(200).json(book.country);
    } else {
        res.status(200).json({
            message:"no hay libros de ese autor",
            success: false,
        })
    }
});

app.get("/year&pages/:author?", (req, res) => {

    let author = req.params.author;
    let mayuscula = true;
    let string = "";
    for (let i = 0; i < author.length; i++) {
        if (mayuscula) {
            string += author[i].toUpperCase();
            mayuscula = false;
        } else if (author[i] == "-") {
            string += " ";
            mayuscula = true;
        } else {
            string += author[i];
        }
    }
    if (author == "cervantes") {
        string = "Miguel de Cervantes";
    }
    const book = books.find(book => book.author === string);
    
    if (book != "") {
        res.status(200).json({pages: book.pages, year: book.year});
    } else {
        res.status(200).json({
            message:"no hay libros de ese autor",
            success: false,
        })
    }
});

app.get("/country/count/:country", (req, res) => {
    let country = req.params.country;
    let initial = country[0].toUpperCase();
    let remainder = country.slice(1, country.length);

    let search = initial + remainder;
    let count = 0;
    for (let i = 0; i < 100; i++) {
        if (books[i].country == search) {
            count += 1;
        } 
    }

    res.status(200).json(count);
});

app.get("/country/at-least/:country", (req, res) => {
    let country = req.params.country;
    let initial = country[0].toUpperCase();
    let remainder = country.slice(1, country.length);

    let search = initial + remainder;
    let exists = false;
    for (let i = 0; i < books.length; i++) {
        if (books[i].country == search) {
            exists = true;
            break;
        } 
    }

    res.status(200).json(exists);
});

app.get("/pages/all-greater/:number", (req, res) => {
    let number = req.params.number
    let condition = true;
    for (let i = 0; i < books.length; i++) {
        if (books[i].pages <= number) {
            condition = false;
            break;
        } 
    }

    res.status(200).json(condition);
});


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })