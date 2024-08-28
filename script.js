const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const numPagesInput = document.querySelector("#num-pages-input");
const isReadInput = document.querySelector("#is-read-input");
const ratingInput = () => document.querySelector('input[name="star"]:checked');
const submitBtn = document.querySelector("#submit-btn");
const bookList = document.querySelector("#book-list");
const isReadRadio = document.querySelector("#is-read-radio");

let library = [];

let bookIdCounter = library.length;

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

function getBookInput() {
  const title = titleInput.value ? titleInput.value : "N/A";
  const author = authorInput.value ? authorInput.value : "N/A";
  const numPages = numPagesInput.value ? numPagesInput.value : "N/A";
  const isRead = isReadRadio.checked ? true : false;
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

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
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
  { title: "Kindred", author: "Octavia E. Butler" },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin" },
  { title: "Parable of the Sower", author: "Octavia E. Butler" },
  { title: "Ancillary Justice", author: "Ann Leckie" },
  { title: "Dawn", author: "Octavia E. Butler" },
  { title: "The Power", author: "Naomi Alderman" },
  { title: "Frankenstein", author: "Mary Shelley" },
  { title: "The Hunger Games", author: "Suzanne Collins" },
  { title: "Shards of Honor", author: "Lois McMaster Bujold" },
  { title: "Who Fears Death", author: "Nnedi Okorafor" },
  { title: "Binti", author: "Nnedi Okorafor" },
  { title: "The Dispossessed", author: "Ursula K. Le Guin" },
  { title: "Ammonite", author: "Nicola Griffith" },
  { title: "Mirror Dance", author: "Lois McMaster Bujold" },
  { title: "Grass", author: "Sheri S. Tepper" },
  { title: "The Snow Queen", author: "Joan D. Vinge" },
  { title: "Fledgling", author: "Octavia E. Butler" },
  { title: "Oryx and Crake", author: "Margaret Atwood" },
  { title: "The Handmaid's Tale", author: "Margaret Atwood" },
  { title: "Memory", author: "Lois McMaster Bujold" },
  { title: "Patternmaster", author: "Octavia E. Butler" },
];

function populateLibrary() {
  sciFiBooksByWomen.forEach(book => {
      const newBook = new Book(
          book.title,
          book.author,
          Math.floor(Math.random() * 500) + 100,
          Math.random() > 0.5,
          Math.floor(Math.random() * 5) + 1,
      );
      library.push(newBook);
  });
  displayBookList();
}

window.onload = populateLibrary;