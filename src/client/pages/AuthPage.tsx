import * as React from "react";
import UsernamePasswordForm from "../features/authentication/basic/components/UsernamePasswordForm";
import OAuth2Form from "../features/authentication/oauth2/components/OAuth2Form";

const AuthPage = () => {
    return <div className="authPage">
        <div>
            <h1 className="auth-title">Auth in Ivan's web-4-lab</h1>
        </div>
        <OAuth2Form/>
        <span className="or-text">OR</span>
        <UsernamePasswordForm/>
    </div>
}

export default AuthPage