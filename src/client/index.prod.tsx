import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from "./App";

const domNode = document.getElementById('root');
ReactDOM.hydrate(<App/>, domNode)