import * as React from "react";
import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login/Login";
import AppHeader from "./common/Header/AppHeader";


class App extends Component {
    render() {
        return <div className="app">
            <div>
                <AppHeader/>
            </div>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
            </Routes>
        </div>;
    }
}

export default App;