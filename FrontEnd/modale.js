let modal = null;
const modaleContainer = document.getElementById("modale");

// ouverture de la modale

const openModale = function (e) {
    e.preventDefault(e)
    const target = document.querySelector(e.target.getAttribute('href'))
    modaleContainer.classList.replace ("modal-off", "modal")
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal);
    modal.querySelectorAll('.js-close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', closeModal);
    });
    modal.querySelectorAll('.js-modal-stop').forEach(modalStop => {
        modalStop.addEventListener('click', stopPropagation);
    });
}

//fermeture de la modale

const closeModal = function (e) {
    if (modal === null) return;

    if (e.target === modal || e.target.closest('.js-close-modal')) {
        e.preventDefault();
        modaleContainer.classList.replace ("modal", "modal-off")
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
        modal.querySelectorAll('.js-close-modal').forEach(closeButton => {
            closeButton.removeEventListener('click', closeModal);
        });
        modal.querySelectorAll('.js-modal-stop').forEach(modalStop => {
            modalStop.removeEventListener('click', stopPropagation);
        });
        modal = null;
    } return
};

// pour éviter de fermer la modale en cliquant dessus

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach( a => {
    a.addEventListener('click', openModale)
})

// gestion des pages

const boutonAjout = document.querySelector('.btn-ajout')
const page1 = document.querySelector('.page1')
const page2 = document.querySelector('.page2')

if (boutonAjout) {
    boutonAjout.addEventListener("click", function () {
        page1.classList.add( "item-off")
        page2.classList.remove( "item-off")
    })
}

const boutonPage = document.querySelector('.page-button')

if (boutonPage) {
    boutonPage.addEventListener("click", function () {
        page2.classList.add( "item-off")
        page1.classList.remove( "item-off")
    })
}