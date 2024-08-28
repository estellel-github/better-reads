// const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", 295, false);

// console.log(theHobbit.info());

// console.log(Object.getPrototypeOf(theHobbit) === Book.prototype);

// Book.prototype.getPages = function() {
//   return `This book has ${this.numPages} pages.`
// }

// console.log(theHobbit.getPages());

// TESTS: Adding book objects to arrays
// const randomBook = new Book ("N/A", "N/A", 0, true);
// library.push(randomBook);
// const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", 295, false);
// library.push(theHobbit);

// console.log(library);
// console.log(randomBook.info());
// console.log(theHobbit.info());

const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const numPagesInput = document.querySelector("#num-pages-input");
const isReadInput = document.querySelector("#is-read-input");
const submitBtn = document.querySelector("#submit-btn");
const bookList = document.querySelector("#book-list");

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.isRead}`;
  };
}

const library = [];

function getBookInput() {
  const title = titleInput.value;
  const author = authorInput.value;
  const numPages = numPagesInput.value;
  const isRead = isReadInput.checked;
  return new Book(title, author, numPages, isRead);
}

function addNewBook() {
  clearBookList();
  const newBook = getBookInput();
  library.push(newBook);
  console.log(newBook.info());
  console.table(library);
  displayBookList();
}

function clearBookList() {
  bookList.textContent = "";
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewBook();
});

function displayBookList() {
  for (let book of library) {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");
    const isRead = document.createElement("p");

    card.classList.add("card");
    title.classList.add("card-title");
    author.classList.add("card-author");
    numPages.classList.add("card-num-pages");
    isRead.classList.add("card-is-read");
    
    title.textContent = book.title;
    author.textContent = book.author;
    numPages.textContent = `${book.numPages} pages`;
    isRead.textContent = (book.isRead) ? "Already read" : "Not read yet";

    card.append(title, author, numPages, isRead);
    bookList.appendChild(card);
  }
}