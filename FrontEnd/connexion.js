export async function ajoutListenerMotdepasse(email, password) {
        
        const formulaire = {
            email,
            password,
        }
        console.log("test retour payload", formulaire);
        const chargeUtile = JSON.stringify(formulaire);
        console.log("test retour charge utile", chargeUtile);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: chargeUtile
            })
            console.log("reste reponse", response)

            if (response.ok){
                const succes = await response.json();
                console.log("YES", succes);
            }
            else {
                const fail = await response.json();
                console.log("NO", fail);
                return fail.message || "Identifiants de connexion incorrect";
            }   
}