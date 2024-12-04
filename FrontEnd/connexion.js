//const API_URL = "http://localhost:5678/api/"
export async function ajoutListenerMotdepasse(email, password) {
        
        const data = {
            email,
            password,
        }
        console.log("test retour payload", data);
        const dataJS = JSON.stringify(data);
        //const dataJ 
        console.log("test retour charge utile", dataJS);            
            //const response = await fetch(`$API_URL/users/login`);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: dataJS
            })
            console.log("reste reponse", response)
            if (response.ok){
                const succes = await response.json();
                console.log("YES", succes.token);
                return {token: succes.token};
            }
            else {
                const fail = await response.json();
                console.log("NO", fail);
                return  { error: fail.message || "Identifiants de connexion incorrect" };
            }   
}