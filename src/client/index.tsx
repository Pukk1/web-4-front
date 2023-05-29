import * as React from "react";
import {createRoot, Root} from "react-dom/client";
import App from "./App";

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App/>);