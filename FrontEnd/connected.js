export function isConnected (){
    const token = sessionStorage.getItem ("token");
    return !!token;
}