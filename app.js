import { fetchBooks } from "./api.js";
import { renderBooks } from "./ui.js";

const signUpBtn1=document.getElementById("signUpBtn1");
const signupform = document.getElementById('signup_form');
const pressBtn1=document.getElementById("pressBtn1");
const signUpBox=document.getElementsByClassName("signUpBox");

signUpBtn1.addEventListener("click", ()=>{
signupform.style.display="flex";
pressBtn1.style.display="none";
});

signupform.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(signupform);
    const signUpBody = Object.fromEntries(formData.entries());

    let oldUsersData = localStorage.getItem('usersData'); 
    if (signUpBody.password !== signUpBody.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    if (oldUsersData === null) {
        let newUser = [signUpBody]
        newUser = JSON.stringify(newUser);
        localStorage.setItem('usersData', newUser);
    }else {
        oldUsersData = JSON.parse(oldUsersData);

        for (let oldUser of oldUsersData) {
            if (oldUser.email === signUpBody.email) {
                alert("Opps! this email has been used!")
                return;
            }
        }
    
        oldUsersData.push(signUpBody);
        localStorage.setItem('usersData', JSON.stringify(oldUsersData));
        alert("You have registered successfully!");
        signupform.reset();
        signupform.style.display = "none";
        pressBtn1.style.display = "block";
    }
})

const signInBtn = document.getElementById("signInBtn");
const loginForm = document.getElementById("login_form");
const pressLoginBtn = document.getElementById("pressLoginBtn");

signInBtn.addEventListener("click", () => {
    loginForm.style.display = "flex";
    pressLoginBtn.style.display = "none";
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const loginData = Object.fromEntries(formData.entries());

    let users = localStorage.getItem("usersData");
    if (!users) {
        alert("No users found. Please sign up first!");
        return;
    }
    users = JSON.parse(users);
    const user = users.find(
        u => u.email === loginData.email && u.password === loginData.password
    );
    if (!user) {
        alert("Wrong email or password!");
        return;
    }
    alert(`Welcome ${user.firstName}!`);

    loginForm.reset();
    loginForm.style.display = "none";
    pressLoginBtn.style.display = "block";
});

const showCollection=document.getElementById("showCollection");
const collectionBox=document.getElementById("collectionBox");
showCollection.addEventListener("click", () => {
    if (collectionBox.style.display === "block") {
        collectionBox.style.display = "none";
        showCollection.innerText = "კოლექციის ნახვა";
    } else {
        collectionBox.style.display = "block";
        showCollection.innerText = "კოლექციის დახურვა";
    }

});

const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
let booksData = [];

async function loadBooks() {
    try {
        loader.style.display = "block";
        booksData = await fetchBooks();
        renderBooks(booksData, booksContainer);

    }catch (error) {
        booksContainer.innerHTML = `
            <h2>დაფიქსირდა შეცდომა</h2>
        `;

    }finally {
        loader.style.display = "none";
    }
}
loadBooks();

searchBtn.addEventListener("click", () => {
    const term = searchInput.value.toLowerCase();
    booksContainer.innerHTML = "";
    let filtered = [];

    for (let i = 0; i < booksData.length; i++) {
        let book = booksData[i];
        let title = "";

        if (book.title) {
            title = book.title.toLowerCase();
        }
        let author = "";
        if (book.author_name) {
            author = book.author_name[0].toLowerCase();
        }
        if (title.includes(term) || author.includes(term)) {
            filtered.push(book);
        } 
    }
    renderBooks(filtered, booksContainer);
});





const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modalOverlay.style.display = "none";
    }
}); //what

window.openBook = function(title, author, img) { 
    modalContent.innerHTML = `
        <img src="${img}" style="width:100%">
        <h3>${title}</h3>
        <p>${author}</p>
    `;

    modalOverlay.style.display = "flex";
}