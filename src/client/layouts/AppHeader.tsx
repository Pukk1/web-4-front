import * as React from "react";
import {CurrentAccess, LogOut} from "../context/store";

export type AppHeaderProps = {
    currentAccount: CurrentAccess,
    onLogout: LogOut
}

const AppHeader = ({currentAccount, onLogout}: AppHeaderProps) => {

    if (currentAccount === null) {
        return <div>
            <h1 className="auth-title">Auth in Ivan's web-4-lab</h1>
        </div>
    } else {
        return <div>
            <div>
                <h1 className="auth-title">Auth in Ivan's web-4-lab</h1>
            </div>
            <div>
                <span>{"Current user: " + currentAccount.accountName}</span>
            </div>
            <button className="btn btn-outline btn-info" onClick={onLogout}>
                Logout
            </button>
        </div>
    }
}

export default AppHeader