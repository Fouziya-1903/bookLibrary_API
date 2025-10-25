let books = [];
let bookId = 1;

export function addBook(req, res) {
  const { title, author, year, genre } = req.body;

  if (!title || !author || !year || !genre) {
    return res.status(400).json({
      msg: "All the fields (title, author, year, genre) are required!.",
    });
  }

  const bookExist = books.find(
    (b) =>
      b.title.toLowerCase() == title.toLowerCase() &&
      b.author.toLowerCase() == author.toLowerCase()
  );

  if (bookExist) {
    return res.status(400).json({
      msg: "The book with this title and author already exists",
    });
  }

  const newBook = {
    id: bookId,
    title,
    author,
    year,
    genre,
    addedBy: {
      id: req.user.id,
      email: req.user.email,
    },
  };

  books.push(newBook);
  bookId++;

  res.status(201).json({
    msg: "Hurray! New book has been added.",
    book: newBook,
  });
}

export function getAllBooks(req, res) {
  return res.json({
    totalBooks: books.length,
    books: books,
  });
}

export function getBook(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ msg: "Title is required" });
  }

  const book = books.find(
    (b) => b.title.toLowerCase() === title.toLowerCase()
  );

  if (!book) {
    return res.status(404).json({ msg: "Book not found" });
  }

  return res.json(book);
}