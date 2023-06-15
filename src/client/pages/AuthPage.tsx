import * as React from "react";
import UsernamePasswordForm from "../features/authentication/basic/components/UsernamePasswordForm";
import OAuth2Form from "../features/authentication/oauth2/components/OAuth2Form";

const AuthPage = () => {
    return <div className="auth-page">
        <div>
            <h1 className="auth-title">Auth in Ivan's web-4-lab</h1>
        </div>
        <div>
            <OAuth2Form/>
        </div>
        <div>
            <span className="or-text">OR</span>
        </div>
        <div>
            <UsernamePasswordForm/>
        </div>
    </div>
}

export default AuthPage