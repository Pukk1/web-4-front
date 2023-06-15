import * as React from "react";
import {Link, Route, Routes} from "react-router-dom";
import UsernamePasswordLoginForm from "./UsernamePasswordLoginForm";
import UsernamePasswordRegistrationForm from "./UsernamePasswordRegistrationForm";

const UsernamePasswordForm = () => {
    return <div className="username-password-form">
        <Routes>
            <Route index element={<UsernamePasswordLoginForm/>}/>
            <Route path="/registration" element={<UsernamePasswordRegistrationForm/>}/>
        </Routes>
    </div>
}

export default UsernamePasswordForm