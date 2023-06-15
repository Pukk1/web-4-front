import * as React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {printError, useStore} from "../../../../context/store";
import jwtDecode from "jwt-decode";
import {AuthToken} from "../../basic/components/UsernamePasswordLoginForm";

const OAuth2RedirectHandler = () => {

    const location = useLocation()
    // const setAccessToken = useStore(state => state.setAccessToken)
    const setCurrentAccess = useStore(state => state.setCurrentAccess)

    function getUrlParameter(name: string) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');


    if (token) {
        const claims = jwtDecode<AuthToken>(token)
        const accountName = claims.name;
        const username = claims.username;

        setCurrentAccess({accessToken: token, username: username, accountName: accountName})
        return <Navigate to={"/main"}/>;
    } else {
        printError(error)
        return <Navigate to={"/auth"}/>;
    }

}

export default OAuth2RedirectHandler;