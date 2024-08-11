const bookList = document.querySelector('.books');
const newBookButton = document.querySelector('.container__button');
// const myLibrary = [];

class Book {
  static id = 0;
  constructor(title='Unknown', author='Unknown', pages='0', finished=false, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.id = id;
  }
}

class Library {
  libraryArray = [];

  addBookToLibrary(book) {
    this.libraryArray.push(book);
  }

  addRandomBooks(numberOfBooks) {
    for (let i = 0; i < numberOfBooks; i++) {
      const book = new Book(`Nice book ${i+1}`, `Great author ${i+1}`, Math.floor(Math.random() * 490) + 10, false, Book.id++);
      this.addBookToLibrary(book);
    }  
  }

  getBookIndex(bookToSearch) {
    for (let [i, currentBook] of this.libraryArray.entries()) {
      if (currentBook.id === bookToSearch.id) {
        return i;
      }
    }
    return null;
  }
}

let library = new Library();
library.addRandomBooks(10);
displayBooks(library.libraryArray);


function displayBooks(arrayOfBooks) {
  bookList.replaceChildren();  
  for (let i = arrayOfBooks.length - 1; i >= 0; i--) {
    const book = arrayOfBooks[i];
    
    // Create list item and article that will contain all book information

    const listElement = document.createElement('li');
    listElement.classList.add('book');
    const bookArticle = document.createElement('article');
    bookArticle.classList.add('book__article');
    listElement.appendChild(bookArticle);
    
    // Create div element that will contain all of text labels 

    const textsDiv = document.createElement('div');
    textsDiv.classList.add('book__texts');

    const titleLabel = document.createElement('h4');
    titleLabel.classList.add('book__label');
    titleLabel.textContent = 'Title:';
    const title = document.createElement('p');
    title.classList.add('book__p');
    title.textContent = book.title;

    const authorLabel = document.createElement('h4');
    authorLabel.classList.add('book__label');
    authorLabel.textContent = 'Author:';
    const author = document.createElement('p');
    author.classList.add('book__p');
    author.textContent = book.author;

    const pagesLabel = document.createElement('h4');
    pagesLabel.classList.add('book__label');
    pagesLabel.textContent = 'Pages:';
    const pages = document.createElement('p');
    pages.classList.add('book__p');
    pages.textContent = `${book.pages}`;

    const finished = document.createElement('p');
    finished.classList.add('book__p', 'book__p--finished');        
    finished.textContent = `${book.finished ? 'Book is already finished' : "Book haven't finished"}`;      

    textsDiv.append(titleLabel, title, authorLabel, author, pagesLabel, pages);
    
    // Create div that will contain all buttons and related items 

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('book__buttons');
    
    const finish = document.createElement('button');
    finish.textContent = book.finished ? 'Read again' : 'Finish';
    finish.classList.add('book__button');                    
    if (book.finished) { 
      finish.classList.add('book__button--disabled');      
    };    

    finish.addEventListener('click', function() {      
      const toFinish = library.getBookIndex(book);
      finish.classList.toggle('book__button--disabled');
      library.libraryArray[toFinish].finished = !library.libraryArray[toFinish].finished;            
      displayBooks(library.libraryArray);   
    });

    const deleteBook = document.createElement('button');    
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add('book__button', 'book__button--delete');
    deleteBook.addEventListener('click', function() {    
      const toDelete = library.getBookIndex(book);  
      if (toDelete !== null) {
        library.libraryArray.splice(toDelete, 1);
        displayBooks(library.libraryArray);      
      }
    });

    buttonsDiv.append(finished, finish, deleteBook);    
    bookArticle.append(textsDiv, buttonsDiv);
    bookList.appendChild(listElement);
  }
}

// Functions related to modal for adding a new book

const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const closeModalButton = document.querySelector('.modal__button-close');
const submitModalButton = document.querySelector('.modal__button-submit');

const formTitle = document.querySelector('.modal__input--title');
const formAuthor = document.querySelector('.modal__input--author');
const formPages = document.querySelector('.modal__input--pages');
const finished = document.getElementsByName('finished');

newBookButton.onclick = function() {
  modal.style.display = 'block';
}

closeModalButton.onclick = function() {
  dismissForm(form);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    dismissForm(form);
  }
}

formPages.addEventListener('input', function() {
  formPages.pattern = '^[1-9][0-9]*$';    
  formPages.setCustomValidity('');  
  if (!formPages.checkValidity()) {    
    formPages.setCustomValidity('expected whole positive number > 0');
  } 
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  for (let radio of finished) {
    if (radio.checked) {
      finishedValue = Boolean(+radio.value);
    }  
  } 
  const book = new Book(formTitle.value, formAuthor.value, formPages.value, finishedValue, Book.id++);
  library.addBookToLibrary(book);  
  displayBooks(library.libraryArray);
  dismissForm(form);  
});

function dismissForm(form) {
  form.reset();
  modal.style.display = 'none';
}