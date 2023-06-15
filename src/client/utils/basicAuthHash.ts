export function genBasicAuthHash(user: string, password: string) {
    let token = user + ":" + password;
    let hash = btoa(token);

    return "Basic " + hash;
}