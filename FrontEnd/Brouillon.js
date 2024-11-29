/**
 * brouillon
 */

/** connexion old

export async function ajoutListenerMotdepasse() {
    const formulaireMotdepasse = document.querySelector(".form");
    formulaireMotdepasse.addEventListener("submit", async function (event){
        event.preventDefault();
        
        const formulaire = {
            formMail: event.target.querySelector("[name=form-mail]").value,
            formMdp: event.target.querySelector("[name=form-password]").value,  
        }
        const chargeUtile = JSON.stringify(formulaire);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: chargeUtile
            })
            try {
            if (response.ok){
                const succes = await response.json();
                console.log("YES", succes);
            }
            else {
                const fail = await response.json();
                console.log("NO", fail);
            }
        }
        catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Une erreur s'est produite lors de la connexion.");}
    });
}
*/

/**login old
 * import {ajoutListenerMotdepasse} from "./connexion.js";
ajoutListenerMotdepasse();

const form = document.getElementById('log');
const mail_input = document.getElementById('mail');
const password_input = document.getElementById('password');
const error_message = document.getElementById('erreur-message');


form.addEventListener('submit', (e) => {
    error_message.innerText = "";
    clearErrorStyles();
    const errors = getLoginFormErrors (mail_input.value, password_input.value)
    if(errors.length > 0){
        // réinitialise ka fonction de submit quand il y a des érreurs
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
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
 * 
 */

/**
 * 

export async function ajoutListenerMotdepasse(email, password) {
    const formulaire = {
        formMail: email,
        formMdp: password,
        }
        console.log("Payload to API:", formulaire);

        const chargeUtile = JSON.stringify(formulaire);
        console.log("second retour de payload", formulaire);
        
            try {
                const response = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",
                    headers: { "Content-type": "application/json"},
                    body: chargeUtile
                    
                })
                console.log("3ème retour de payload", formulaire);
                if (response.ok){
                    const succes = await response.json();
                    console.log("YES", succes);
                }
                else {
                    const fail = await response.json();
                    console.log("NO", fail);
                }
            }
        catch (response) {
        alert("Une erreur s'est produite lors de la connexion.");
        console.log("4ème retour de payload", formulaire);
    }
};


 */

/**
 * if (api) {
        error_message.innerText = api;
        console.log("Erreur de connexion");
    }

    else {
        console.log("Login successful!");
        localStorage.setItem("token", result.token);
        //pas sur si ça marche avec le token window.location.href = "index.html";
        console.log("test token", result.token)
    }

 */