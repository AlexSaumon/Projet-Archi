import {ajoutListenerMotdepasse} from "./connexion.js";

const my_form = document.getElementById('log');
const mail_input = document.getElementById('mail');
const password_input = document.getElementById('password');
const error_message = document.getElementById('erreur-message');

my_form.addEventListener('submit',async (e) => {
    // réinitialise la fonction de submit quand il y a des érreurs
    error_message.innerText = "";
    e.preventDefault();
    const errors = validateForm (mail_input.value, password_input.value)
    if(errors.length > 0){
        error_message.innerText = errors.join(". ")
    }
    console.log("Email Input:", mail_input.value);
    console.log("Password Input:", password_input.value);

    const api = await ajoutListenerMotdepasse(mail_input.value, password_input.value);

    if (api.error) {
        error_message.innerText = "Identifiants incorrects";
        console.log("Erreur de connexion", api.error);
    }

    else {
        console.log("Connecté !!");
        sessionStorage.setItem("token", api.token);
        alert ("Vous êtes connecté!");
        window.location.href = "index.html";
        console.log("test token", api.token)
    }

    console.log("Email Input 2:", mail_input.value);
    console.log("Password Input 2:", password_input.value);
})

function validateForm (formmail, formpassword){
    const errors = [];
    if (formmail.trim() === "") {
        errors.push("Mettez un email");
        mail_input.parentElement.classList.add("Incorrect");
    }
    if(formpassword.trim() === ""){
        errors.push("Mettez un mot de passe")
        password_input.parentElement.classList.add('Incorrect');
    }
    return errors;
}