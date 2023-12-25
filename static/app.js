const bookList = document.querySelector('#books');

const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addRandomBooks(numberOfBooks) {
  for (let i = 0; i < numberOfBooks; i++) {
    const book = new Book(`Nice book ${i+1}`, `Great author ${i+1}`, Math.floor(Math.random() * 490) + 10);
    addBookToLibrary(book);
  }
  console.log('books added:');
  for (let book of myLibrary) {
    console.log(`${book.title} ${book.author} ${book.pages}`);    
  }
}

addRandomBooks(10);