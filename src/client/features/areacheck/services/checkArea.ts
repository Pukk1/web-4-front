import {PointType} from "../types/Point";
import {API_BASE_URL} from "../../../data/constants";
import axios from "axios";
import {AccessTokenType} from "../../../context/store";

export const sendDot = (dot: PointType, token: AccessTokenType) => {
    // axios({
    //     method: 'put',
    //     url: API_BASE_URL + `/add-dot`,
    //     params: {
    //         x: dot.x,
    //         y: dot.y,
    //         r: dot.r
    //     },
    //     headers: {
    //         'Authorization': token,
    //     }
    // }).then(
    //     () => {
    //         console.log('Точка успешно добавлена')
    //     }
    // ).catch(
    //     (err) => {
    //         console.log(err)
    //         errCallBack()
    //     }
    // )

    return axios.post(
        API_BASE_URL + '/api/v1/area-point',
        {x: dot.x, y: dot.y, r: dot.r},
        {
            headers: {
                'Authorization': "Bearer " + token,
            }
        })
        // .then(
        //     (response) => {
        //         console.log('Точка успешно добавлена')
        //     }
        // )
}