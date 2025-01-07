let gallery = []; 
let modal_gallery = []; 
let category = [];

// répucère les données mis à jour
async function fetchGalleryData() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    gallery = data; //mise à jour de la galerie
    modal_gallery = data; 
    return data;
    
}

// similère à fetchgallerydata

async function fetchCategoryId() {
    const response = await fetch('http://localhost:5678/api/categories');
    const idData = await response.json();
    category = idData;
    return idData;
}

// placement de la fonction catégorie data

function categoryButton(idData) {
    const sectionGallery = document.querySelector(".filter-button");
    sectionGallery.innerHTML = ""; 
    for (let i = 0; i < idData.length; i++) {
        const article = idData[i];

        const categoryElement = document.createElement("button");
        categoryElement.innerText = article.name;
        categoryElement.dataset.id = article.id;
        categoryElement.className = "btn-category";

        categoryElement.addEventListener("click", function () {
            const filteredGallery = gallery.filter(item => item.categoryId === article.id);
            galerieTravaux(filteredGallery);
        });

        sectionGallery.appendChild(categoryElement);

    }

    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.addEventListener("click", () => {
        galerieTravaux(gallery); 
    });

    sectionGallery.prepend(allButton);
}

categoryButton(category);
 
//genération de la galerie

function galerieTravaux(data) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = ""; 

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

//genération de la galerie avec la fonction de supression

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

// fonction de supression; 

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

// section gérant l'ajout d'image

const fileInput = document.getElementById("file");
const fileLabel = document.getElementById("file-label");
const titleInput = document.getElementById("titre");
const categoryInput = document.getElementById("categorie");
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
const fileContainer = document.getElementById("file-container");
const previewContainer = document.getElementById("preview-container");

    //gestion de la preview

function addSingleFile(event) {
    const file = event.target.files[0]; 
    if (!file) return;

    // Validattion

    if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image.");
        return;
    }
    container.innerHTML = "";

    // Generation de la preview
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        fileContainer.classList.replace("file-container", "item-off")
        previewContainer.classList.replace("item-off", "file-container")
        submitButton.classList.replace("submit-btn-css-off", "submit-btn-css")
        container.appendChild(imgElement); 
    };
    reader.readAsDataURL(file); 
}

fileInput.addEventListener("change", addSingleFile);

    //formulaire d'envoie

submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach((span) => {
        span.innerText = "";
    });

    let hasError = false;

    // formulaire d'envoie avec les checks d'érreur 

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

    //fonction d'envoie

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

// genération d'affichage de la gallerie et des filtres

document.addEventListener("DOMContentLoaded", async () => {
    const initialData = await fetchGalleryData(); 
    galerieTravaux(initialData); 
    galerieModale(initialData); 

    const categories = await fetchCategoryId(); 
    categoryButton(categories); 
});