


let gallery = []; 
let modal_gallery = []; 

// répucère les données mis à jour
async function fetchGalleryData() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    gallery = data; //mise à jour de la galerie
    modal_gallery = data; 
    return data;
    
}




function galerieTravaux(data) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = ""; // 

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
    sectionModalGallery.innerHTML = ""; 

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
}


const fileInput = document.getElementById("file");
const fileLabel = document.getElementById("file-label");
const titleInput = document.getElementById("titre");
const categoryInput = document.getElementById("categorie");
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
const fileContainer = document.getElementById("file-container");
const previewContainer = document.getElementById("preview-container");

function addSingleFile(event) {
    const file = event.target.files[0]; // Get the selected file

    // Validate if a file was selected
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image.");
        return;
    }

    // Clear the container before showing a new preview
    container.innerHTML = "";



    // Use FileReader to generate the preview
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgElement = document.createElement("img");
        imgElement.src = e.target.result; // Set the base64 image source
        fileContainer.classList.replace("file-container", "item-off")
        previewContainer.classList.replace("item-off", "file-container")
        submitButton.classList.replace("submit-btn-css-off", "submit-btn-css")
        container.appendChild(imgElement); // Append preview to the container
    };
    reader.readAsDataURL(file); // Read the file as a base64 URL
}

fileInput.addEventListener("change", addSingleFile);

submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach((span) => {
        span.innerText = "";
    });

    let hasError = false;

    if (!fileInput.files[0]) {
        document.getElementById("file-error").innerText = "Veuillez sélectionner une image.";
        hasError = true;
    } 
    
    if (fileInput.files[0].size > 4 * 1024 * 1024) {
        document.getElementById("file-error").innerText = "La taille de l'image ne doit pas dépasser 4 Mo.";
        hasError = true;
    }

    if (!titleInput.value.trim()) {
        document.getElementById("titre-error").innerText = "Veuillez entrer un titre.";
        hasError = true;
    }

    if (!categoryInput.value) {
        document.getElementById("categorie-error").innerText = "Veuillez sélectionner une catégorie.";
        hasError = true;
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", categoryInput.value);
        
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
        container.innerHTML = "";
        fileContainer.classList.replace("item-off", "file-container");
        previewContainer.classList.replace("file-container", "item-off");
        submitButton.classList.replace("submit-btn-css", "submit-btn-css-off")
    } else {
        const error = await response.json();
        alert(`Erreur: ${error.message || "Impossible d'ajouter l'image."}`);
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