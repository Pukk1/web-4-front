import * as React from "react";
import {CurrentAccess, LogOut} from "../context/store";

export type AppHeaderProps = {
    currentAccount: CurrentAccess,
    onLogout: LogOut
}

const AppHeader = ({currentAccount, onLogout}: AppHeaderProps) => {

    if (currentAccount === null) {
        return <div></div>
    } else {
        return <div></div>
    }
}

export default AppHeader