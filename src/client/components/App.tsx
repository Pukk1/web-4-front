import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login/Login";
import AppHeader from "./common/header/AppHeader";
import PrivateRoute from "../utils/PrivateRoute/PrivateRoute";
import {useStore} from "../services/store/store";
import Main from "./main/Main/Main";


const App = () => {

    const currentAccount = useStore(state => state.currentAccount)
    const onLogout = useStore(state => state.logOut)

    return (<div className="app">
        <div>
            <AppHeader currentAccount={currentAccount} onLogout={onLogout}/>
        </div>
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"main"} element={<PrivateRoute currentAccount={currentAccount} child={<Main/>}/>}/>
        </Routes>
    </div>)

}

export default App;