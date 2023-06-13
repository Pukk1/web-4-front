import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";

class AppHeader extends Component {
    render() {
        return (
            <Link to="/">Logout</Link>
        );
    }
}

export default AppHeader;