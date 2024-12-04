import {ajoutListenerMotdepasse} from "./connexion.js";

const my_form = document.getElementById('log');
const mail_input = document.getElementById('mail');
const password_input = document.getElementById('password');
const error_message = document.getElementById('erreur-message');

my_form.addEventListener('submit',async (e) => {
    // réinitialise la fonction de submit quand il y a des érreurs
    error_message.innerText = "";
    e.preventDefault();

    const api = await ajoutListenerMotdepasse(mail_input.value, password_input.value);

    if (api.error) {
        error_message.innerText = "Identifiants incorrects";
    }

    else {
        sessionStorage.setItem("token", api.token);
        alert ("Vous êtes connecté!");
        window.location.href = "index.html";
    }
})