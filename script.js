const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const yearInput = document.querySelector("#year-input");
const numPagesInput = document.querySelector("#num-pages-input");
const isReadInput = document.querySelector("#is-read-input");
const ratingInput = () => document.querySelector('input[name="star"]:checked');
const submitBtn = document.querySelector("#submit-btn");
const bookList = document.querySelector("#book-list");
const isReadRadio = document.querySelector("#is-read-radio");

let library = [];

let bookIdCounter = library.length;

function Book(title, author, year, numPages, isRead, rating) {
  this.id = bookIdCounter++;
  this.title = title;
  this.author = author;
  this.year = year;
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

function getBookInput() {
  const title = titleInput.value ? titleInput.value : "N/A";
  const author = authorInput.value ? authorInput.value : "N/A";
  const year = yearInput.value ? yearInput.value : "N/A";
  const numPages = numPagesInput.value ? numPagesInput.value : "N/A";
  const isRead = isReadRadio.checked ? true : false;
  const rating = ratingInput() ? ratingInput().value : "No rating";
  return new Book(title, author, year, numPages, isRead, rating);
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
  modal.style.display = "none";
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
    const year = document.createElement("p");
    const numPages = document.createElement("p");
    const isRead = document.createElement("p");
    const rating = createStarRating(book.rating);
    const buttonBox = document.createElement("buttonBox");
    const toggleReadBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    
    removeBtn.id = "remove-btn-" + i;
    removeBtn.textContent = "🗑 Remove";
    removeBtn.addEventListener("click", () => {
      library = library.filter((item) => item.id !== book.id);
      displayBookList();
    });

    toggleReadBtn.textContent = book.isRead ? "Mark as unread" : "Mark as read";

    book.isRead ? toggleReadBtn.classList.add("toggle-read", "btn-small", "red") : toggleReadBtn.classList.add("toggle-read", "btn-small", "green");

    toggleReadBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBookList();
    });

    card.classList.add("card");
    title.classList.add("card-title");
    author.classList.add("card-author");
    year.classList.add("card-year");
    numPages.classList.add("card-num-pages");
    isRead.classList.add("card-is-read");
    rating.classList.add("card-rating");
    removeBtn.classList.add("remove-btn", "btn-small");
    buttonBox.classList.add("buttonBox")

    title.textContent = book.title;
    author.textContent = book.author;
    numPages.textContent = `${book.numPages} pages`;
    year.textContent = "Year of publication: " + book.year;
    // isRead.textContent = book.isRead ? "Already read" : "Not read yet";
    card.append(title, author, year, numPages, rating, isRead, buttonBox);
    buttonBox.append(toggleReadBtn, removeBtn);
    bookList.appendChild(card);
  }
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  numPagesInput.value = null;
  isReadRadio.checked = true;
  ratingInput.value = 1;
}

// Modal

// Get the modal
const modal = document.querySelector("#form-modal");

// Get the button that opens the modal
const modalBtn = document.querySelector("#modal-btn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector("#close-btn");

// When the user clicks on the button, open the modal
modalBtn.onclick = function() {
  clearForm();
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// FOR TESTING

const sciFiBooksByWomen = [
  { title: "Kindred", author: "Octavia E. Butler", year: 1979 },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: 1969 },
  { title: "Parable of the Sower", author: "Octavia E. Butler", year: 1993 },
  { title: "Ancillary Justice", author: "Ann Leckie", year: 2013 },
  { title: "Dawn", author: "Octavia E. Butler", year: 1987 },
  { title: "The Power", author: "Naomi Alderman", year: 2016 },
  { title: "Frankenstein", author: "Mary Shelley", year: 1818 },
  { title: "The Hunger Games", author: "Suzanne Collins", year: 2008 },
  { title: "Shards of Honor", author: "Lois McMaster Bujold", year: 1986 },
  { title: "Who Fears Death", author: "Nnedi Okorafor", year: 2010 },
  { title: "Binti", author: "Nnedi Okorafor", year: 2015 },
  { title: "The Dispossessed", author: "Ursula K. Le Guin", year: 1974 },
  { title: "Ammonite", author: "Nicola Griffith", year: 1992 },
  { title: "Mirror Dance", author: "Lois McMaster Bujold", year: 1994 },
  { title: "Grass", author: "Sheri S. Tepper", year: 1989 },
  { title: "The Snow Queen", author: "Joan D. Vinge", year: 1980 },
  { title: "Fledgling", author: "Octavia E. Butler", year: 2005 },
  { title: "Oryx and Crake", author: "Margaret Atwood", year: 2003 },
  { title: "The Handmaid's Tale", author: "Margaret Atwood", year: 1985 },
  { title: "Memory", author: "Lois McMaster Bujold", year: 1996 },
  { title: "Patternmaster", author: "Octavia E. Butler", year: 1976 },
];

function populateLibrary() {
  sciFiBooksByWomen.forEach(book => {
      const newBook = new Book(
          book.title,
          book.author,
          book.year,
          Math.floor(Math.random() * 500) + 100,
          Math.random() > 0.5,
          Math.floor(Math.random() * 5) + 1,
      );
      library.push(newBook);
  });
  displayBookList();
}

window.onload = populateLibrary;