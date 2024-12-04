function isConnected (){
    const token = sessionStorage.getItem ("token");
    return (token !== "") && (token !==undefined) && (token !==null); 
}