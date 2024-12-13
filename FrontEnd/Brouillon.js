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

    /** Project js old
     * 
     * const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

let gallery = JSON.parse(window.localStorage.getItem("gallery")) || works;
let modal_gallery = JSON.parse(window.localStorage.getItem("modal-gallery")) || works;



async function galerieTravaux() {
    const sectionGallery = document.querySelector(".gallery");

    try {
        const updatedResponse = await fetch('http://localhost:5678/api/works');
        gallery = await updatedResponse.json();

        sectionGallery.innerHTML = ""; 


    for (let i = 0; i < gallery .length; i++) {
        const article = gallery [i];

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
    } catch (error) {
        console.error("ça veut plus marcher si je fait pas ça, aled", error);
    }
}

galerieTravaux(gallery)

/**function galerieTravaux(data) {
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

        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(nomElement);
        sectionGallery.appendChild(ficheElement);
    }
}

const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

let gallery = JSON.parse(window.localStorage.getItem("gallery")) || works;
let modal_gallery = JSON.parse(window.localStorage.getItem("modal-gallery")) || works;

async function galerieModale() {
    const sectionModalGallery = document.querySelector(".modal-gallery");

    try {
        const updatedResponse = await fetch('http://localhost:5678/api/works');
        modal_gallery = await updatedResponse.json();

        sectionModalGallery.innerHTML = ""; 

        for (let i = 0; i < modal_gallery.length; i++) {
            const article = modal_gallery[i];

            const iconElement = document.createElement("i");
            iconElement.className = "fa-solid fa-trash-can fa-xs";

            iconElement.addEventListener("click", function () {
                handleDeleteClick(article.id);
            });

            const ficheElement = document.createElement("article");
            ficheElement.dataset.id = article.categoryId;

            const imageElement = document.createElement("img");
            imageElement.src = article.imageUrl;

            ficheElement.appendChild(imageElement);
            ficheElement.appendChild(iconElement);
            sectionModalGallery.appendChild(ficheElement);
        }
    } catch (error) {
        console.error("ça veut plus marcher si je fait pas ça, aled", error);
    }
}


galerieModale(modal_gallery)

async function handleDeleteClick(id) {
    const confirmation = confirm("Voulez-vous supprimer cet image?");
    if (!confirmation) return;
    const token = sessionStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "* / *""
            }
        });

        if (response.ok) {
            // Re-fetch updated works data from the server
            const updatedResponse = await fetch('http://localhost:5678/api/works');
            const updatedWorks = await updatedResponse.json();

            // Update gallery and modal-gallery
            gallery = updatedWorks;
            modal_gallery = updatedWorks;

            // Re-render both galleries
            galerieTravaux(gallery);
            galerieModale(modal_gallery);

            // Optionally update localStorage
            window.localStorage.setItem("gallery", JSON.stringify(gallery));
            window.localStorage.setItem("modal-gallery", JSON.stringify(modal_gallery));
        } else {
        }
    } catch (error) {
        
    }
}


const fileInput = document.getElementById("file");
const titleInput = document.getElementById("titre");
const categoryInput = document.getElementById("categorie");
const submitButton = document.getElementById("submit-btn");


submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // Validate form fields
    if (!fileInput.files[0]) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    if (fileInput.files[0].size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4 Mo.");
        return;
    }    

    if (!titleInput.value.trim()) {
        alert("Veuillez entrer un titre.");
        return;
    }
    if (!categoryInput.value) {
        alert("Veuillez sélectionner une catégorie.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", categoryInput.value);

    try {
        
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert("Photo ajoutée avec succès !");
            console.log(result);
            galerieTravaux(gallery);
            galerieModale(modal_gallery);
            fileInput.value = "";
            titleInput.value = "";
            categoryInput.value = "";
        } else {
            const error = await response.json();
            console.error("Erreur lors de l'ajout:", error);
            alert(`Erreur: ${error.message || "Impossible d'ajouter l'image."}`);
        }
    } catch (error) {
        console.error("Erreur réseau:", error);
        alert("Une erreur réseau s'est produite. Veuillez réessayer.");
    }
});


const boutonTous = document.querySelector(".filter .btn-tous"); 

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
        console.log("tri fait")
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

let gallery = []; 
let modal_gallery = []; 

// répucère les données mis à jour
async function fetchGalleryData() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        gallery = data; //mise à jour de la galerie
        modal_gallery = data; 
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
    }
}




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

        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(nomElement);
        sectionGallery.appendChild(ficheElement);
    }
}


function galerieModale(data) {
    const sectionModalGallery = document.querySelector(".modal-gallery");
    sectionModalGallery.innerHTML = ""; // Clear the modal gallery

    data.forEach((article) => {
        const ficheElement = document.createElement("article");
        ficheElement.dataset.id = article.categoryId;

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const iconElement = document.createElement("i");
        iconElement.className = "fa-solid fa-trash-can fa-xs";
        iconElement.addEventListener("click", function () {
            handleDeleteClick(article.id);
        });

        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(iconElement);
        sectionModalGallery.appendChild(ficheElement);
    });
}


galerieModale(modal_gallery)

async function handleDeleteClick(id) {
    const confirmation = confirm("Voulez-vous supprimer cet image?");
    if (!confirmation) return;
    const token = sessionStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "*/*"
                }
            });
    
            if (response.ok) {
                const updatedData = await fetchGalleryData(); 
                galerieTravaux(updatedData); 
                galerieModale(updatedData); 
            } else {
            }
        } catch (error) {
            /** je ne suis pas sure du fonctionnement du finally, donc je laisse catch par defaut */
        }
    }
    
    
    const fileInput = document.getElementById("file");
    const titleInput = document.getElementById("titre");
    const categoryInput = document.getElementById("categorie");
    const submitButton = document.getElementById("submit-btn");
    
    
    submitButton.addEventListener("click", async function (event) {
        event.preventDefault();
    
        // Validate form fields
        if (!fileInput.files[0]) {
            alert("Veuillez sélectionner une image.");
            return;
        }
    
        if (fileInput.files[0].size > 4 * 1024 * 1024) {
            alert("La taille de l'image ne doit pas dépasser 4 Mo.");
            return;
        }    
    
        if (!titleInput.value.trim()) {
            alert("Veuillez entrer un titre.");
            return;
        }
        if (!categoryInput.value) {
            alert("Veuillez sélectionner une catégorie.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        formData.append("title", titleInput.value.trim());
        formData.append("category", categoryInput.value);
    
        try {
            
            const token = sessionStorage.getItem("token"); 
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            });
    
            if (response.ok) {
                alert("Photo ajoutée avec succès !");
                const updatedData = await fetchGalleryData(); 
                galerieTravaux(updatedData); 
                galerieModale(updatedData)
                fileInput.value = "";
                titleInput.value = "";
                categoryInput.value = "";
            } else {
                const error = await response.json();
                console.error("Erreur lors de l'ajout:", error);
                alert(`Erreur: ${error.message || "Impossible d'ajouter l'image."}`);
            }
        } catch (error) {
        }
    });
    
    
    const boutonTous = document.querySelector(".filter .btn-tous"); 
    
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
            console.log("tri fait")
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
    
    document.addEventListener("DOMContentLoaded", async () => {
        const initialData = await fetchGalleryData(); 
        galerieTravaux(initialData); 
        galerieModale(initialData); 
    });