const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const yearInput = document.querySelector("#year-input");
const numPagesInput = document.querySelector("#num-pages-input");
const isReadInput = document.querySelector("#is-read-input");
const imgUrlInput = document.querySelector("#img-url-input");
const ratingInput = () => document.querySelector('input[name="star"]:checked');
const isReadRadio = document.querySelector("#is-read-radio");
const submitBtn = document.querySelector("#submit-btn");

const stats = document.querySelector("#stats");
const bookList = document.querySelector("#book-list");

let library = [];

let bookIdCounter = library.length;

function Book(title, author, year, numPages, isRead, rating, imgUrl) {
  this.id = bookIdCounter++;
  this.title = title;
  this.author = author;
  this.year = year;
  this.numPages = numPages;
  this.isRead = isRead;
  this.rating = rating;
  this.imgUrl =
    imgUrl ||
    "https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg";
  this.getBookInfo = function () {
    return `${this.title} by ${this.author}`;
  };
  this.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };
}

function getBookInput() {
  const title = titleInput.value ? titleInput.value : "N/A";
  const author = authorInput.value ? authorInput.value : "N/A";
  const year = yearInput.value ? yearInput.value : "N/A";
  const numPages = numPagesInput.value ? numPagesInput.value : "N/A";
  const isRead = isReadRadio.checked ? true : false;
  const rating = ratingInput() ? ratingInput().value : "No rating";
  const imgUrl = imgUrlInput.value;
  return new Book(title, author, year, numPages, isRead, rating, imgUrl);
}

function addNewBook() {
  clearBookList();
  const newBook = getBookInput();
  library.push(newBook);
  console.table(library);
  displayBookList();
}

function clearBookList() {
  bookList.textContent = "";
}

function clearStats() {
  stats.textContent = "";
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
  for (let i = library.length - 1; i >= 0; i--) {
    const book = library[i];
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const img = document.createElement("img");
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

    book.isRead
      ? toggleReadBtn.classList.add("toggle-read", "btn-small", "red")
      : toggleReadBtn.classList.add("toggle-read", "btn-small", "green");

    toggleReadBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBookList();
    });

    img.src = book.imgUrl;
    img.alt = `Cover of ${book.title}`;

    card.classList.add("card");
    title.classList.add("card-title");
    author.classList.add("card-author");
    year.classList.add("card-year");
    numPages.classList.add("card-num-pages");
    isRead.classList.add("card-is-read");
    rating.classList.add("card-rating");
    removeBtn.classList.add("remove-btn", "btn-small");
    buttonBox.classList.add("buttonBox");

    title.textContent = book.title;
    author.textContent = book.author;
    numPages.textContent = `${book.numPages} pages`;
    year.textContent = "Year of publication: " + book.year;
    // isRead.textContent = book.isRead ? "Already read" : "Not read yet";
    card.append(img, title, author, year, numPages, rating, buttonBox);
    buttonBox.append(toggleReadBtn, removeBtn);
    bookList.appendChild(card);
  }
  storeToLocal();
  displayStats();
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  numPagesInput.value = null;
  isReadRadio.checked = true;
  ratingInput.value = 1;
}

function displayStats() {
  clearStats();
  
  const totalBooks = document.createElement("div");
  const totalAuthors = document.createElement("div");
  const totalRead = document.createElement("div");
  const totalNotRead = document.createElement("div");
  const mostRecentAdded = document.createElement("div");

  totalBooks.textContent = "📖 Total books: " + library.length;

  const authorsSet = new Set(library.map((book) => book.author));
  const numUniqueAuthors = Array.from(authorsSet);
  totalAuthors.textContent =
    "👤 Individual authors: " + numUniqueAuthors.length;

  let numBooksRead = library.filter((item) => item.isRead === true);
  totalRead.textContent = "✅ Total books read: " + numBooksRead.length;

  stats.append(totalBooks, totalAuthors, totalRead);

  let numBooksNotRead = library.filter((item) => item.isRead === false);

  totalNotRead.textContent =
    "⌛ Total books to read: " + numBooksNotRead.length;

  if (library.length > 0) {
    let latestBookAdded = library[library.length - 1].getBookInfo();
    mostRecentAdded.textContent = "✨ Latest addition: " + latestBookAdded;
  }

  stats.append(
    totalBooks,
    totalAuthors,
    totalRead,
    totalNotRead,
    mostRecentAdded
  );
}

// Modal

// Get the modal
const modal = document.querySelector("#form-modal");

// Get the button that opens the modal
const modalBtn = document.querySelector("#modal-btn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector("#close-btn");

// When the user clicks on the button, open the modal
modalBtn.onclick = function () {
  clearForm();
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// FOR TESTING

const sciFiBooksByWomen = [
  {
    title: "Kindred",
    author: "Octavia E. Butler",
    year: 1979,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/57/OctaviaEButler_Kindred.jpg",
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    imgUrl:
      "https://m.media-amazon.com/images/I/81eTMHvXZqL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Parable of the Sower",
    author: "Octavia E. Butler",
    year: 1993,
    imgUrl:
      "https://m.media-amazon.com/images/I/81cccWWMQmL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Ancillary Justice",
    author: "Ann Leckie",
    year: 2013,
    imgUrl:
      "https://www.orbitbooks.net/wp-content/uploads/2013/06/Leckie_AncillaryJustice_TP.jpg",
  },
  {
    title: "Dawn",
    author: "Octavia E. Butler",
    year: 1987,
    imgUrl:
      "https://m.media-amazon.com/images/I/61jVFGXNLnL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    imgUrl:
      "https://www.printmag.com/wp-content/uploads/2017/10/2a34d8_737fd003c63b4109909e4f589704a4c2mv2.jpg",
  },
  {
    title: "Shards of Honor",
    author: "Lois McMaster Bujold",
    year: 1986,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fa/Shards_of_honor_cover.jpg",
  },
  {
    title: "Who Fears Death",
    author: "Nnedi Okorafor",
    year: 2010,
    imgUrl:
      "https://m.media-amazon.com/images/I/71fYaW9Q9RL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "The Dispossessed",
    author: "Ursula K. Le Guin",
    year: 1974,
    imgUrl:
      "https://m.media-amazon.com/images/I/914nOgluTAL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Ammonite",
    author: "Nicola Griffith",
    year: 1992,
    imgUrl:
      "https://m.media-amazon.com/images/I/61EWjbnkKhL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Mirror Dance",
    author: "Lois McMaster Bujold",
    year: 1994,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/05/Mirrordancecover.jpg",
  },
  {
    title: "The Snow Queen",
    author: "Joan D. Vinge",
    year: 1980,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/TheSnowQueen%281stEd%29.jpg",
  },
  {
    title: "Fledgling",
    author: "Octavia E. Butler",
    year: 2005,
    imgUrl:
      "https://m.media-amazon.com/images/I/81u6EGJRNhL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Oryx and Crake",
    author: "Margaret Atwood",
    year: 2003,
    imgUrl:
      "https://m.media-amazon.com/images/I/710lFK3q6yL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    year: 1985,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/TheHandmaidsTale%281stEd%29.jpg/220px-TheHandmaidsTale%281stEd%29.jpg",
  },
  {
    title: "Her Smoke Rose Up Forever",
    author: "James Tiptree, Jr.",
    year: 1990,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/62/Her_smoke_rose_up_forever.jpg",
  },
];

function storeToLocal() {
  const libraryJson = JSON.stringify(library);
  localStorage.setItem("library", libraryJson);
  console.table(localStorage);
}

function retrieveBooks() {
  const storedBooksJson = localStorage.getItem("library");
  if (storedBooksJson && storedBooksJson.length != 0) {
    tempLibrary = JSON.parse(storedBooksJson);
    tempLibrary.forEach((book) => {
      const newBook = new Book(
        book.title,
        book.author,
        book.year,
        book.numPages,
        book.isRead,
        book.rating,
        book.imgUrl,
      );
      library.push(newBook);
    })
    displayBookList();
  } else {
    console.log("No books found in Local Storage.");
  }
}

function loadSampleLibrary() {
  library = [];
  sciFiBooksByWomen.forEach((book) => {
    const newBook = new Book(
      book.title,
      book.author,
      book.year,
      Math.floor(Math.random() * 500) + 100,
      Math.random() > 0.5,
      Math.floor(Math.random() * 5) + 1,
      book.imgUrl,
    );
    library.push(newBook);
  });
  displayBookList();
}

window.onload = retrieveBooks();
