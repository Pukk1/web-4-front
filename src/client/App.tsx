import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import AppHeader from "./layouts/AppHeader";
import PrivateRoute from "./utils/PrivateRoute";
import {useStore} from "./context/store";
import Main from "./pages/Main";


const App = () => {

    const currentAccount = useStore(state => state.currentAccount)
    const onLogout = useStore(state => state.logOut)

    return (<div className="app">
        <div>
            <AppHeader currentAccount={currentAccount} onLogout={onLogout}/>
        </div>
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"main"} element={<PrivateRoute currentAccount={currentAccount} child={<Main/>} redirectPath="/"/>}/>
        </Routes>
    </div>)

}

export default App;