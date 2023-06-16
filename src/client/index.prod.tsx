import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {loadableReady} from '@loadable/component'

loadableReady(() => {
    const domNode = document.getElementById('root');
    ReactDOM.hydrate(<React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>, domNode)
})