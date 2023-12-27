const books = document.querySelector('.books');
const addBookButton = document.querySelector('.books__button--add-book');

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
    const book = new Book(`Nice book ${getLastNumber(myLibrary) + 1}`, `Great author ${getLastNumber(myLibrary) + 1}`, Math.floor(Math.random() * 490) + 10);
    addBookToLibrary(book);
  }  
  // console.log('books added:');
  // for (const book of myLibrary) {
  //   console.log(`${book.title} ${book.author} ${book.pages}`);    
  // }
}

function getLastNumber(arrayOfBooks) {
  let lastNumber = 0;
  if (arrayOfBooks.length > 0) {
    const book = arrayOfBooks.slice(-1)[0];
    lastNumber = +book.title.split(' ').slice(-1)[0];
    // console.log(lastNumber);
  }
  return lastNumber;
}

addRandomBooks(10);

function makeListItemWithAddBookButton() {
  const listElement = document.createElement('li');
  listElement.classList.add('books__list');
  const addBookButton = document.createElement('button');
  addBookButton.classList.add('books__button', 'books__button--add-book');
  addBookButton.textContent = 'add book';
  addBookButton.addEventListener('click', function() {
    addRandomBooks(1);
    console.log(myLibrary.length);
    displayBooks(myLibrary);
  });
  listElement.appendChild(addBookButton);
  return listElement;
}

function displayBooks(arrayOfBooks) {
  books.replaceChildren();
  books.appendChild(makeListItemWithAddBookButton());
  // for (const [index, book] of arrayOfBooks.entries()) {  
  for (let i = arrayOfBooks.length - 1; i >= 0; i--) {
    const book = arrayOfBooks[i];
    // add li element 'book'
    const listElement = document.createElement('li');
    listElement.classList.add('books__list');
    // add article element inside 'book__article'
    const bookArticle = document.createElement('article');
    bookArticle.classList.add('books__article');
    listElement.appendChild(bookArticle);
    
    // add p elements for title, author, pages and reading status 'book__*'
    const title = document.createElement('p');
    title.classList.add('books__p');
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement('p');
    author.classList.add('books__p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('books__p');
    pages.textContent = `Pages: ${book.pages}`;

    const finished = document.createElement('p');
    finished.classList.add('books__p');        
    finished.textContent = `${book.finished ? 'Book is already finished' : "Book haven't finished"}`;      

    // button to finish 'book__button' (book__button--disabled)
    const finish = document.createElement('button');
    finish.classList.add('books__button');                
    finish.textContent = 'Finish';
    if (book.finished) { 
      finish.classList.add('book_button--disabled')           
    };

    // button to delete 'book__button book__button--red
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add('books__button', 'books__button--red');
    
    bookArticle.append(title, author, pages, finished, finish, deleteBook);

    books.appendChild(listElement);
  }
}

displayBooks(myLibrary);