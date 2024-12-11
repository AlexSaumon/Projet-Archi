let modal = null;

const openModale = function (e) {
    e.preventDefault(e)
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
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

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelectorAll('.js-close-modal').forEach(closeButton => {
        closeButton.removeEventListener('click', closeModal);
    });
    modal.querySelectorAll('.js-modal-stop').forEach(modalStop => {
        modalStop.removeEventListener('click', stopPropagation);
    });
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach( a => {
    a.addEventListener('click', openModale)
})

const boutonAjout = document.querySelector('.btn-ajout')
const page1 = document.querySelector('.page1')
const page2 = document.querySelector('.page2')

if (boutonAjout) {
    boutonAjout.addEventListener("click", function () {
        page1.style.display = "none"
        page2.style.display = "flex"
    })
}

const boutonPage = document.querySelector('.page-button')

if (boutonPage) {
    boutonPage.addEventListener("click", function () {
        page2.style.display = "none"
        page1.style.display = "flex"
    })
}