const reponse = await fetch('http://localhost:5678/api/works');
const pieces = await reponse.json();

function galerieTravaux(gallery){
    for (let i = 0; i < gallery.length; i++) {
        const article = gallery[i];
        console.log(article);
        const sectionGallery = document.querySelector(".gallery");
        const ficheElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const nomElement = document.createElement("p");
        nomElement.innerText = article.title;

        sectionGallery.appendChild(ficheElement);
        ficheElement.appendChild(imageElement);
        ficheElement.appendChild(nomElement);

    }
    
}

galerieTravaux(pieces);

//const rep = await fetch('http://localhost:5678/api/categories');
//const pie = await reponse.json();