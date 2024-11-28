


export async function ajoutListenerMotdepasse(email, password) {
    const formulaire = {
        formMail: email,
        formMdp: password,
        }
        console.log("Payload to API:", formulaire);

        const chargeUtile = JSON.stringify(formulaire);
            try {
                const response = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",
                    headers: { "Content-type": "application/json"},
                    body: chargeUtile
                })
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
        alert("Une erreur s'est produite lors de la connexion.");
    }
};



