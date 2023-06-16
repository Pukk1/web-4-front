import * as React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppHeader from "./layouts/AppHeader";
import PrivateRoute from "./utils/PrivateRoute";
import {Access, useStore} from "./context/store";
// import MainPage from "./pages/MainPage";
import OAuth2RedirectHandler from "./features/authentication/oauth2/components/OAuth2RedirectHandler";
import loadable from '@loadable/component';
import "./App.css"

const MainPage = loadable(() => import("./pages/MainPage"))

const App = () => {

    const currentAccess = useStore(state => state.currentAccount)
    const onLogout = useStore(state => state.logOut)

    return (<div className="app">
        <div>
            <AppHeader currentAccount={currentAccess} onLogout={onLogout}/>
        </div>
        <Routes>
            <Route path="/auth/*" element={
                <PrivateRoute
                    isAccessible={currentAccess === null}
                    child={<AuthPage/>}
                    redirectPath="/main"/>
            }/>
            <Route path="/main" element={
                <PrivateRoute
                    isAccessible={currentAccess !== null}
                    child={<MainPage access={currentAccess as Access}/>}
                    redirectPath="/auth"/>
            }/>
            <Route path="/redirect/auth" element={<OAuth2RedirectHandler/>}></Route>
            <Route path="*" element={<Navigate to={"/auth"} replace/>}/>
        </Routes>
    </div>)

}

export default App;