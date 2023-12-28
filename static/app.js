const bookList = document.querySelector('.books');
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
  for (const book of myLibrary) {
    console.log(`${book.title} ${book.author} ${book.pages}`);    
  }
}

addRandomBooks(10);

function displayBooks(arrayOfBooks) {
  // for (const [index, book] of arrayOfBooks.entries()) {  
  for (let i = arrayOfBooks.length - 1; i >= 0; i--) {
    const book = arrayOfBooks[i];
    // add li element 'book'
    const listElement = document.createElement('li');
    listElement.classList.add('book');
    // add article element inside 'book__article'
    const bookArticle = document.createElement('article');
    bookArticle.classList.add('book__article');
    listElement.appendChild(bookArticle);
    
      // add p elements for title, author, pages and reading status 'book__*'
    const title = document.createElement('p');
    title.classList.add('book__p');
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement('p');
    author.classList.add('book__p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('book__p');
    pages.textContent = `Pages: ${book.pages}`;

    const finished = document.createElement('p');
    finished.classList.add('book__p');        
    finished.textContent = `${book.finished ? 'Book is already finished' : "Book haven't finished"}`;      

    // button to finish 'book__button' (book__button--disabled)
    const finish = document.createElement('button');
    finish.classList.add('book__button');                
    finish.textContent = 'Finish';
    if (book.finished) { 
      finish.classList.add('book_button--disabled')           
    };

    // button to delete 'book__button book__button--red
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add('book__button', 'book__button--red');
    
    bookArticle.append(title, author, pages, finished, finish, deleteBook);

    bookList.appendChild(listElement);
  }
}

displayBooks(myLibrary);

// Get the modal
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal_form');
const newBookButton = document.querySelector('.books__button');
const closeModalButton = document.querySelector('.modal__button-close');
const submitModalButton = document.querySelector('.modal__button-submit');

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const finished = document.getElementsByName('finished');

// When the user clicks on the button, open the modal 
newBookButton.onclick = function() {
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
closeModalButton.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

submitModalButton.addEventListener('click', function(event) {
  event.preventDefault();
  console.log(formTitle.value, formAuthor.value, formPages.value);

  for (let radio of finished) {
    if (radio.checked) {
      console.log('boolean of ' + radio.value + ' is: ' + Boolean(+radio.value));
    }  
  }
  modal.style.display = 'none';
});