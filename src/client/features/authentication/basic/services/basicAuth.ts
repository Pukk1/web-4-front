import axios from "axios";
import {API_BASE_URL} from "../../../../data/constants";

export const loginApiCall = (username: string, password: string) => {
    return axios
        .post(API_BASE_URL + "/login/basic", {}, {
            headers: {
                'Authorization': genBasicAuthHash(username, password),
            }
        })
}

function genBasicAuthHash(user: string, password: string) {
    let token = user + ":" + password;

    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    let hash = btoa(token);

    return "Basic " + hash;
}
