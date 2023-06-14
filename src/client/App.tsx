import * as React from "react";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppHeader from "./layouts/AppHeader";
import PrivateRoute from "./utils/PrivateRoute";
import {useStore} from "./context/store";
import MainPage from "./pages/MainPage";
import {AUTH_PAGE_URI, MAIN_PAGE_URI} from "./data/constants";
import OAuth2RedirectHandler from "./features/authentication/oauth2/components/OAuth2RedirectHandler";


const App = () => {

    const currentAccount = useStore(state => state.currentAccount)
    const onLogout = useStore(state => state.logOut)

    return (<div className="app">
        <div>
            <AppHeader currentAccount={currentAccount} onLogout={onLogout}/>
        </div>
        <Routes>
            <Route path={AUTH_PAGE_URI} element={
                <PrivateRoute
                    isAccessible={currentAccount === null}
                    child={<AuthPage/>}
                    redirectPath={MAIN_PAGE_URI}/>
            }/>
            <Route path={MAIN_PAGE_URI} element={
                <PrivateRoute
                    isAccessible={currentAccount !== null}
                    child={<MainPage/>}
                    redirectPath={AUTH_PAGE_URI}/>
            }/>
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}></Route>
            <Route path={"asd"} element={<div>asd</div>}/>
        </Routes>
    </div>)

}

export default App;