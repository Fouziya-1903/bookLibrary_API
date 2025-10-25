let books = [];
let bookId = 1;

export function addBook(req,res){
    const {title,author,year,genre} = req.body;

    if(!title || !author || !year || !genre){
        return res.status(400).json({
            msg: "All the fields are required!!.."
        });
    }
    const newBook = {
        id: bookId,
        title,
        author,
        year,
        genre,
        addedBy: {
            id: req.user.id , 
            email: req.user.email
        }
    };
    

    const bookExist = books.find((b)=>b.title == title && b.author == author );
    if(bookExist){
        return res.status(400).json({
            msg: "The book already exists"
        })
    }

    bookId++;
    books.push(newBook);
    


    res.status(201).json({
        msg: `hurray!!... new book has been added!!`,book:newBook
    })

}

export function getAllBooks(req,res){
    return res.json({
        totalBooks : 'total Book',book:books
    });
}