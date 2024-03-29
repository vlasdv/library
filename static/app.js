const bookList = document.querySelector('.books');
const newBookButton = document.querySelector('.container__button');
const myLibrary = [];
let id = 0;

function Book(title, author, pages, finished=false, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
  this.id = id;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function getLastNumber(arrayOfBooks) {
  let lastNumber = 0;
  if (arrayOfBooks.length > 0) {
    const book = arrayOfBooks.slice(-1)[0];
    lastNumber = +book.title.split(' ').slice(-1)[0];
  }
  return lastNumber;
}

function addRandomBooks(numberOfBooks) {
  for (let i = 0; i < numberOfBooks; i++) {
    const book = new Book(`Nice book ${i+1}`, `Great author ${i+1}`, Math.floor(Math.random() * 490) + 10, false, id++);
    addBookToLibrary(book);
  }  
}

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
      const toFinish = getBookIndexInArray(book, myLibrary);
      finish.classList.toggle('book__button--disabled');
      myLibrary[toFinish].finished = !myLibrary[toFinish].finished;            
      displayBooks(myLibrary);   
    });

    const deleteBook = document.createElement('button');    
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add('book__button', 'book__button--delete');
    deleteBook.addEventListener('click', function() {    
      const toDelete = getBookIndexInArray(book, myLibrary);  
      if (toDelete !== null) {
        myLibrary.splice(toDelete, 1);
        displayBooks(myLibrary);      
      }
    });

    buttonsDiv.append(finished, finish, deleteBook);    
    bookArticle.append(textsDiv, buttonsDiv);
    bookList.appendChild(listElement);
  }
}

function getBookIndexInArray(bookToSearch, array) {
  for (let [i, currentBook] of myLibrary.entries()) {
    if (currentBook.id === bookToSearch.id) {
      return i;
    }
  }
  return null;
}

addRandomBooks(10);
displayBooks(myLibrary);

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
  const book = new Book(formTitle.value, formAuthor.value, formPages.value, finishedValue, id++);
  addBookToLibrary(book);  
  displayBooks(myLibrary);
  dismissForm(form);  
});

function dismissForm(form) {
  form.reset();
  modal.style.display = 'none';
}