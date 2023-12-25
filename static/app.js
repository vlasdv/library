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

