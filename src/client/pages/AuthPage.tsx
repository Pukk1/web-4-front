import * as React from "react";
import UsernamePasswordForm from "../features/authentication/basic/components/UsernamePasswordForm";
import OAuth2Form from "../features/authentication/oauth2/components/OAuth2Form";

const AuthPage = () => {
    return <div className="auth-page bordered">
        <div>
            <OAuth2Form/>
        </div>
        <div>
            <div className="divider">OR</div>
        </div>
        <div>
            <UsernamePasswordForm/>
        </div>
    </div>
}

export default AuthPage