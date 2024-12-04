//const API_URL = "http://localhost:5678/api/"
export async function ajoutListenerMotdepasse(email, password) {
        
        const data = {
            email,
            password,
        }
        const dataJS = JSON.stringify(data);
        //const dataJ         
            //const response = await fetch(`$API_URL/users/login`);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: dataJS
            })
            if (response.ok){
                const succes = await response.json();
                return {token: succes.token};
            }
            else {
                const fail = await response.json();
                return  { error: fail.message || "Identifiants de connexion incorrect" };
            }   
}