import axios from "axios";
import {API_BASE_URL} from "../../../../data/constants";
import {genBasicAuthHash} from "../../../../utils/basicAuthHash";

export const loginApi = (username: string, password: string) => {
    return axios
        .post(API_BASE_URL + "/login/basic", {}, {
            headers: {
                'Authorization': genBasicAuthHash(username, password),
            }
        })
}

export const registerApi = (name: string, username: string, password: string) => {
    return axios
        .post(API_BASE_URL + "/registration/local",
            {accountName: name, username: username, password: password}
        )
}
