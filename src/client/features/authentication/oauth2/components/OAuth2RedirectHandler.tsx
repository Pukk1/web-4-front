import * as React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AUTH_PAGE_URI, MAIN_PAGE_URI} from "../../../../data/constants";
import {printError, useStore} from "../../../../context/store";

const OAuth2RedirectHandler = () => {

    const location = useLocation()
    const setAccessToken = useStore(state => state.setAccessToken)

    function getUrlParameter(name: string) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');


    if (token) {
        setAccessToken(token)
        return <Navigate to={MAIN_PAGE_URI}/>;
    } else {
        printError(error)
        return <Navigate to={AUTH_PAGE_URI}/>;
    }

}

export default OAuth2RedirectHandler;