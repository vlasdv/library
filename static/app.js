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

function addRandomBooks(numberOfBooks) {
  for (let i = 0; i < numberOfBooks; i++) {
    const book = new Book(`Nice book ${i+1}`, `Great author ${i+1}`, Math.floor(Math.random() * 490) + 10, false, id++);
    addBookToLibrary(book);
  }
  console.log('books added:');
  for (const book of myLibrary) {
    console.log(`${book.title} ${book.author} ${book.pages}`);    
  }
}

addRandomBooks(10);

function displayBooks(arrayOfBooks) {
  bookList.replaceChildren();
  console.log(myLibrary.length);
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
    
    const textsDiv = document.createElement('div');
    textsDiv.classList.add('book__texts');

    // add p elements for title, author, pages and reading status 'book__*'
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
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('book__buttons');

    // button to finish 'book__button' (book__button--disabled)
    const finish = document.createElement('button');
    finish.textContent = book.finished ? 'Read again' : 'Finish';
    finish.classList.add('book__button');                    
    if (book.finished) { 
      finish.classList.add('book__button--disabled');      
    };    

    finish.addEventListener('click', function() {      
      const toFinish = getBookIndexInArray(book, myLibrary);
      finish.classList.toggle('book_button--disabled');
      myLibrary[toFinish].finished = !myLibrary[toFinish].finished;            
      displayBooks(myLibrary);   
    });

    // button to delete 'book__button book__button--red
    const deleteBook = document.createElement('button');    
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add('book__button', 'book__button--red');
    deleteBook.addEventListener('click', function() {    
      const toDelete = getBookIndexInArray(book, myLibrary);  
      if (toDelete !== null) {
        myLibrary.splice(toDelete, 1);
        console.log('deleted');
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

displayBooks(myLibrary);

// Get the modal
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal_form');
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
  dismissForm(form);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    dismissForm(form);
  }
}

submitModalButton.addEventListener('click', function(event) {
  event.preventDefault();
  console.log(formTitle.value, formAuthor.value, formPages.value);

  let finishedValue = false;
  for (let radio of finished) {
    if (radio.checked) {
      console.log('boolean of ' + radio.value + ' is: ' + Boolean(+radio.value));
      finishedValue = Boolean(+radio.value);
    }  
  }

  const book = new Book(formTitle.value, formAuthor.value, formPages.value, finishedValue, id++);
  addBookToLibrary(book);
  console.log('id: ' + book.id);

  displayBooks(myLibrary);
  dismissForm(form);
});

function dismissForm(form) {
  form.reset();
  modal.style.display = 'none';
}