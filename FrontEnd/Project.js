
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

