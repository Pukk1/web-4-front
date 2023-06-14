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
            <Route path={"/"} element={
                <PrivateRoute
                    isAccessible={currentAccount === null}
                    child={<Login/>}
                    redirectPath={"/main"}/>
            }/>
            <Route path={"main"} element={
                <PrivateRoute
                    isAccessible={currentAccount !== null}
                    child={<Main/>}
                    redirectPath="/"/>
            }/>
        </Routes>
    </div>)

}

export default App;