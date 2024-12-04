import {isConnected } from "./connected.js";

const banner = document.querySelector(".banner")

if  (isConnected() && banner) {
    const bannerElement = document.createElement("p");
    bannerElement.innerHTML = "Mode édition";
    banner.appendChild(bannerElement);
}

else {
    banner.style.display = "none";
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


