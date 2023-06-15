import * as React from "react";
import {ReactElement} from "react";
import {Navigate} from "react-router-dom";

export type PrivateRouteProps = {
    isAccessible: boolean,
    redirectPath: string,
    child: ReactElement,
}

const PrivateRoute = ({isAccessible, redirectPath, child}: PrivateRouteProps) => {

    if (isAccessible) {
        return child;
    } else {
        return <Navigate to={redirectPath} replace={true}/>;
    }
}

export default PrivateRoute;