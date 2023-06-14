import * as React from "react";
import UsernamePasswordForm from "../features/authentication/basic/components/UsernamePasswordForm";
import OAuth2Form from "../features/authentication/oauth2/components/OAuth2Form";

const AuthPage = () => {
    return <div className="authPage">
        <h1 className="auth-title">Login in Ivan's web-4-lab</h1>
        <OAuth2Form/>
        <span className="or-text">OR</span>
        <UsernamePasswordForm/>
        {/*<span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>*/}
    </div>
}

export default AuthPage