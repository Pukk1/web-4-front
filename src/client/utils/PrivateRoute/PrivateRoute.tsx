import * as React from "react";
import {ReactElement} from "react";
import {CurrentAccountType} from "../../services/store/store";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
    currentAccount: CurrentAccountType,
    redirectPath?: string,
    child: ReactElement,
}

const PrivateRoute = ({currentAccount, redirectPath = '/', child}: PrivateRouteProps) => {

    if (currentAccount !== null) {
        return <Navigate to={redirectPath} replace={true}/>;
    } else {
        return child;
    }
}

export default PrivateRoute;