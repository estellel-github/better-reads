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
const ratingInput = () => document.querySelector('input[name="star"]:checked');
const submitBtn = document.querySelector("#submit-btn");
const bookList = document.querySelector("#book-list");

let bookIdCounter = 0;

function Book(title, author, numPages, isRead, rating) {
  this.id = bookIdCounter++;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
  this.rating = rating;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numPages} pages, read: ${
      this.isRead ? "Yes" : "No"
    }, rating: ${this.rating}`;
  };
  this.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  }
}

let library = [];

function getBookInput() {
  const title = titleInput.value ? titleInput.value : "N/A";
  const author = authorInput.value ? authorInput.value : "N/A";
  const numPages = numPagesInput.value ? numPagesInput.value : "N/A";
  const isRead = isReadInput.checked;
  const rating = ratingInput() ? ratingInput().value : "No rating";
  return new Book(title, author, numPages, isRead, rating);
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

function createStarRating(rating) {
  const starRatingP = document.createElement("p");
  starRatingP.className = "star-rating-p";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className =
      i <= rating ? "star-rating-filled" : "star-rating-unfilled";
    starRatingP.appendChild(star);
  }
  return starRatingP;
}

function displayBookList() {
  clearBookList();
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");
    const isRead = document.createElement("p");
    const rating = createStarRating(book.rating);
    const toggleReadBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    
    removeBtn.id = "remove-btn-" + i;
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      library = library.filter((item) => item.id !== book.id);
      displayBookList();
    });

    toggleReadBtn.textContent = book.isRead ? "Set as unread" : "Set as read";

    toggleReadBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBookList();
    });

    card.classList.add("card");
    card.dataset.libraryIndex = book.id;
    title.classList.add("card-title");
    author.classList.add("card-author");
    numPages.classList.add("card-num-pages");
    isRead.classList.add("card-is-read");
    rating.classList.add("card-rating");
    removeBtn.classList.add("remove-btn");

    title.textContent = book.title;
    author.textContent = book.author;
    numPages.textContent = `${book.numPages} pages`;
    isRead.textContent = book.isRead ? "Already read" : "Not read yet";
    card.append(title, author, numPages, isRead, toggleReadBtn, rating, removeBtn);
    bookList.appendChild(card);
  }
}
