import * as React from "react";
import * as ReactDOM from 'react-dom';
import {createRoot} from "react-dom/client";
import App from "./App";

const domNode = document.getElementById('root');
const root = createRoot(domNode);
// ReactDOM.hydrate(<App/>, domNode)
root.render(<App/>);