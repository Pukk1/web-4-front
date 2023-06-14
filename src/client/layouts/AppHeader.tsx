import * as React from "react";
import {CurrentAccountType, LogOutType} from "../context/store";

interface AppHeaderProps {
    currentAccount: CurrentAccountType,
    onLogout: LogOutType
}

const AppHeader = ({currentAccount, onLogout}: AppHeaderProps) => {

    if (currentAccount === null) {
        return <div></div>
    } else {
        return <div></div>
    }
}

export default AppHeader