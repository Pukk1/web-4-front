import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from "./App";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import StartPage from "./components/startPage/StartPage";
import MainPage from "./components/mainPage/MainPage";

const domNode = document.getElementById('root');
// ReactDOM.hydrate(<App/>, domNode)
const root = createRoot(domNode);

const router = createBrowserRouter([
    {
        path: "/start/*",
        element: <StartPage/>,
    },
    {
        path: "/main/*",
        element: <MainPage/>,
    },
])

ReactDOM.hydrate(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
    domNode
);