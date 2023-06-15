import {NewPoint} from "../types";
import {API_BASE_URL} from "../../../data/constants";
import axios from "axios";
import {AccessToken, Access} from "../../../context/store";

export const sendDot = (dot: NewPoint, token: AccessToken) => {

    return axios.post(
        API_BASE_URL + '/api/v1/area-point',
        {x: dot.x, y: dot.y, r: dot.r},
        {
            headers: {
                'Authorization': "Bearer " + token,
            }
        })
}

export const getAllAccountDots = (access: Access) => {
    return axios.get(
        API_BASE_URL + '/api/v1/area-point/get-all',
        {
            headers: {
                'Authorization': "Bearer " + access.accessToken,
            },
            params: {
                'username': access.username
            }
        })
}