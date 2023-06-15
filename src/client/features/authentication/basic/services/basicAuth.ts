import axios from "axios";
import {API_BASE_URL} from "../../../../data/constants";

// const request = (options, authHeader) => {
//     const headers = new Headers({
//         'Content-Type': 'application/json',
//         'Authorization': authHeader,
//     })
//
//     const defaults = {headers: headers};
//     options = Object.assign({}, defaults, options);
//
//     return fetch(options.url, options)
//         .then(response =>
//             response.json().then(json => {
//                 if(!response.ok) {
//                     return Promise.reject(json);
//                 }
//                 return json;
//             })
//         );
// };

// export function getCurrentUser() {
//     if(!localStorage.getItem(ACCESS_TOKEN)) {
//         return Promise.reject("No access token set.");
//     }
//
//     return request({
//         url: API_BASE_URL + "/user/me",
//         method: 'GET'
//     });
// }

// export function loginApiCall(username, password) {
//     return request({
//         url: API_BASE_URL + "/login/basic",
//         method: 'POST',
//         // body: JSON.stringify(Object.assign({}, {username: username, password: password}))
//     }, authenticateUser(username, password));
// }

// export function register(username, password) {
//     return request({
//         url: API_BASE_URL + "/registration/local",
//         method: 'POST',
//         body: JSON.stringify(signupRequest)
//     });
// }

export const loginApiCall = (username, password) => {
    return axios
        .post(API_BASE_URL + "/login/basic", {}, {
            headers: {
                'Authorization': genBasicAuthHash(username, password),
            }
        })
}

function genBasicAuthHash(user, password) {
    let token = user + ":" + password;

    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    let hash = btoa(token);

    return "Basic " + hash;
}
