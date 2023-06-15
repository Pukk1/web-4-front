import * as React from "react";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {printError, useStore} from "../../../../context/store";
import {loginApiCall} from "../services/basicAuth";
import jwtDecode from "jwt-decode";

export type AuthToken = {
    name: string;
    username: string;
}

const UsernamePasswordLoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    const setCurrentAccount = useStore(state => state.setCurrentAccess)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        loginApiCall(username, password)
            .then(response => {
                const token = response.headers['authorization']
                const claims = jwtDecode<AuthToken>(token)
                const accountName = claims['name'];
                const username = claims['username']

                setCurrentAccount({accessToken: token, username: username, accountName: accountName})
                navigate("/redirect/auth?token=" + token)
            })
            .catch(error => {
                printError(error)
            })
    }

    return <div className="login-form">
        <form onSubmit={handleSubmit}>
            <input name="login" type="text" placeholder="Username" value={username}
                   onChange={(event) => setUsername(event.target.value)}/>
            <input name="password" type="password" placeholder="Password" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Save</button>
        </form>
        <span className="register-link">New user? <Link to="/auth/registration">Registration!</Link></span>
    </div>
}

export default UsernamePasswordLoginForm