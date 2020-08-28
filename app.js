let ham = document.querySelector('.ham');
let flexUl = document.querySelector('.flex-ul');
let txt = document.getElementById('txt');
let url = document.getElementById('url');
let add = document.getElementById('add');
let bookItems = document.querySelector('.book-items');
let alert = document.querySelector('.alert');

//TO LOAD
window.addEventListener('load', showBook);

//HAMBURGER MENU
ham.addEventListener('click', () => {
  flexUl.classList.toggle('show-ul');
});

//ADD TO LOCAL STORAGE!
add.addEventListener('click', (e) => {
  e.preventDefault();
  if (txt.value && url.value) {
    let bookmark;
    let marks = localStorage.getItem('bookmarks');
    if (marks == null) {
      bookmark = [];
    } else {
      bookmark = JSON.parse(localStorage.getItem('bookmarks'));
    }
    bookmark.push({
      value: txt.value,
      url: url.value,
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
    showBook();
    txt.value = '';
    url.value = '';
    message('Book mark added!', 'green');
  } else {
    message('PLEASE FILL OUT!', 'red');
  }
});

//SHOW FROM LOCAL STORAGE TO USERS!
function showBook() {
  let bookmark;
  let marks = localStorage.getItem('bookmarks');
  if (marks == null) {
    bookmark = [];
  } else {
    bookmark = JSON.parse(localStorage.getItem('bookmarks'));
  }
  let html = '';
  bookmark.forEach((element, index) => {
    html += `
    <div class="li-items">
    <li><a href="${element.url}" target="_blank">${element.value}</a></li>
    <button id="${index}"" class="rem" onclick="deleteNote(this.id)">
    <i class="fas fa-minus-circle"></i>
    </button>
    </div>
      `;
  });
  bookItems.innerHTML = html;
}

//REMOVE FROM LOCAL STORAGE!
function deleteNote(index) {
  let bookmark;
  let marks = localStorage.getItem('bookmarks');
  if (marks == null) {
    bookmark = [];
  } else {
    bookmark = JSON.parse(localStorage.getItem('bookmarks'));
  }
  bookmark.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmark));
  showBook();
  message('Book mark removed!', 'red');
}

function message(message, color) {
  alert.classList.add(color);
  alert.innerHTML = message;

  setTimeout(() => {
    alert.classList.remove(color);
    alert.innerHTML = '';
  }, 2000);
}
