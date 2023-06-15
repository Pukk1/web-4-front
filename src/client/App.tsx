import * as React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppHeader from "./layouts/AppHeader";
import PrivateRoute from "./utils/PrivateRoute";
import {useStore} from "./context/store";
import MainPage from "./pages/MainPage";
import OAuth2RedirectHandler from "./features/authentication/oauth2/components/OAuth2RedirectHandler";


const App = () => {

    const currentAccount = useStore(state => state.currentAccount)
    const onLogout = useStore(state => state.logOut)

    return (<div className="app">
        <div>
            <AppHeader currentAccount={currentAccount} onLogout={onLogout}/>
        </div>
        <Routes>
            <Route path="/auth/*" element={
                <PrivateRoute
                    isAccessible={currentAccount === null}
                    child={<AuthPage/>}
                    redirectPath="/main"/>
            }/>
            <Route path="/main" element={
                <PrivateRoute
                    isAccessible={currentAccount !== null}
                    child={<MainPage/>}
                    redirectPath="/auth"/>
            }/>
            <Route path="/redirect/auth" element={<OAuth2RedirectHandler/>}></Route>
            <Route path="*" element={<Navigate to={"/auth"}/>}/>
        </Routes>
    </div>)

}

export default App;