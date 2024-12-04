import {isConnected } from "./connected.js";
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();



/** Retrieve gallery data from localStorage */
let gallery = JSON.parse(window.localStorage.getItem("gallery")) || works;

// Function to render gallery items
function galerieTravaux(data) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = ""; // Clear previous items

    for (let i = 0; i < data.length; i++) {
        const article = data[i];

        const ficheElement = document.createElement("article");
        ficheElement.dataset.id = article.categoryId;

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const nomElement = document.createElement("p");
        nomElement.innerText = article.title;

        const idElement = document.createElement("p");
        idElement.innerText = `Category: ${article.categoryId}`;

        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(nomElement);
        sectionGallery.appendChild(ficheElement);
    }
}

// Initial render of the gallery
galerieTravaux(gallery)

// Add event listener for filtering


const boutonTous = document.querySelector(".filter .btn-tous"); 


if (isConnected()) {
    console.log("User is logged in.");
} else {
    console.log("User is not logged in.");
}
if (boutonTous) {
    boutonTous.addEventListener("click", function () {
        const galleryFilter = gallery.filter(item => item.categoryId );
        galerieTravaux(galleryFilter);
    });
}

const boutonObject = document.querySelector(".filter .btn-objet"); 

if (boutonObject) {
    boutonObject.addEventListener("click", function () {
        const galleryFilter = gallery.filter(item => item.categoryId === 1);
        galerieTravaux(galleryFilter);
    });
}

const boutonAppartement = document.querySelector(".filter .btn-Appart")

if (boutonAppartement) {
    boutonAppartement.addEventListener("click", function () {
        const galleryFilter = gallery.filter(item => item.categoryId === 2);
        galerieTravaux(galleryFilter);
    });
}

const boutonHotel = document.querySelector(".filter .btn-hotel")

if (boutonHotel) {
    boutonHotel.addEventListener("click", function () {
        const galleryFilter = gallery.filter(item => item.categoryId === 3);
        galerieTravaux(galleryFilter);
    });
}

const filter= document.querySelector(".filter");

if (isConnected() && filter) {
    filter.style.display = "none";
}

const login = document.querySelector(".login");

if  (isConnected() && login) {
    const logoutElement = document.createElement("p");
    logoutElement.innerText = "logout";
    logoutElement.style.cursor = "pointer"; // pour que je puisse clické
    logoutElement.addEventListener("click", function () {
        window.sessionStorage.clear();
        alert("Vous êtez déconnecté");
        window.location.href = "./login.html";
    });
    login.appendChild(logoutElement)
}

else {
    const loginElement = document.createElement("a");
    loginElement.innerText = "login";
    loginElement.href = "./login.html";
    login.appendChild(loginElement)
}
