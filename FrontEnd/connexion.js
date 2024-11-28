
export function ajoutListenerMotdepasse() {
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
                console.log("YES", yes);
            }
            else {
                console.log("NO", no);
            }
        }
        catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Une erreur s'est produite lors de la connexion.");}
    });
}


