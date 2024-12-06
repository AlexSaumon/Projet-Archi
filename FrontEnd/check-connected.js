import {isConnected } from "./connected.js";

const banner = document.querySelector(".banner")

if  (isConnected() && banner) {
    const bannerIcon = document.createElement("i");
    bannerIcon.className = "fa-regular fa-pen-to-square";

    const bannerText = document.createElement("p");
    bannerText.innerHTML = "Mode édition";

    banner.appendChild(bannerIcon);
    banner.appendChild(bannerText);
    banner.classList.add("banner-on") /**permet d'empecher de mettre du css dans le html */
}

else {
    banner.classList.add("banner-off");
}

const modal = document.querySelector(".js-modal");

if (!isConnected() && modal) {
    modal.style.display = "none"; /**à chnger car ça met du css dans le html */
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

