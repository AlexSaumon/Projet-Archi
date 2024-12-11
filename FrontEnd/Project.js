
const response = await fetch('http://localhost:5678/api/works');
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

/**function galerieModale(data) {
    const sectionModalGallery = document.querySelector(".modal-gallery");
    sectionModalGallery.innerHTML = ""; 

    for (let i = 0; i < data.length; i++) {
        const article = data[i];

        const iconElement = document.createElement("i");
        iconElement.className = "fa-solid fa-trash-can";

        const ficheElement = document.createElement("article");
        ficheElement.dataset.id = article.categoryId;

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(iconElement);
        sectionModalGallery.appendChild(ficheElement);
    }
}*/


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
                "accept": "*/*"
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

