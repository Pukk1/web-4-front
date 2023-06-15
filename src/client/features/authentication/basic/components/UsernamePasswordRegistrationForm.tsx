import * as React from "react";
import {Link} from "react-router-dom";

const UsernamePasswordRegistrationForm = () => {
    return <div className="registration-form">
        <form>
            <input name="name" type="text"/>
            <input name="login" type="text"/>
            <input name="password" type="password"/>
            <button>Save</button>
        </form>
        <span className="login-link">Have account? <Link to="/auth">Login!</Link></span>
    </div>
}

export default UsernamePasswordRegistrationForm