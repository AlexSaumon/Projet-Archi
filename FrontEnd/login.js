import {ajoutListenerMotdepasse} from "./connexion.js";

const form = document.getElementById('log');
const mail_input = document.getElementById('mail');
const password_input = document.getElementById('password');
const error_message = document.getElementById('erreur-message');

form.addEventListener('submit',async (e) => {
    error_message.innerText = "";
        // réinitialise ka fonction de submit quand il y a des érreurs
        e.preventDefault()
    clearErrorStyles();
    const errors = getLoginFormErrors (mail_input.value, password_input.value)
    if(errors.length > 0){
        error_message.innerText = errors.join(". ")
    }
    console.log("Email Input:", mail_input.value);
    console.log("Password Input:", password_input.value);

    const api = await ajoutListenerMotdepasse(mail_input.value, password_input.value);

    if (api) {
        error_message.innerText = api;
        console.log("Erreur de connexion");
    }

    else {
        console.log("Login successful!");
        //pas sur si ça marche avec le token window.location.href = "index.html";
        function retriveToken(api,token){
            
        }
    }

    console.log("Email Input 2:", mail_input.value);
    console.log("Password Input 2:", password_input.value);
})

function getLoginFormErrors (formmail, formpassword){
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
// néttoye l'érreur pour un autre try
function clearErrorStyles() {
    mail_input.parentElement.classList.remove("Incorrect");
    password_input.parentElement.classList.remove("Incorrect");
}