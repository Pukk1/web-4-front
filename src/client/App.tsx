import * as React from "react";
import {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./components/startPage/StartPage";
import MainPage from "./components/mainPage/MainPage";

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path={"/start/*"} element={<StartPage/>}/>
                    <Route path={"/main/*"} element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;