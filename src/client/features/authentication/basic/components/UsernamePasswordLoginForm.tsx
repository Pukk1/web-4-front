import * as React from "react";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {printError, useStore} from "../../../../context/store";
import {loginApi} from "../services/basicAuth";
import jwtDecode from "jwt-decode";

export type AuthToken = {
    name: string;
    username: string;
}

const UsernamePasswordLoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    let navigate = useNavigate()

    const setCurrentAccount = useStore(state => state.setCurrentAccess)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        loginApi(username, password)
            .then(response => {
                const token = response.headers['authorization']
                const claims = jwtDecode<AuthToken>(token)
                const accountName = claims['name'];
                const username = claims['username']

                setCurrentAccount({accessToken: token, username: username, accountName: accountName})
                navigate("/redirect/auth?token=" + token)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    setErrMessage("Invalid username or password")
                } else {
                    printError(error)
                }
            })
    }

    return <div className="login-form">
        <form onSubmit={handleSubmit}>
            <div>
                <span style={{fontSize: "large", color: "red"}}>{errMessage}</span>
            </div>
            <div>
                <input name="username" type="text" placeholder="Username"
                       className="input input-bordered input-success w-full max-w-xs" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div>
                <input name="password" type="password" placeholder="Password"
                       className="input input-bordered input-success w-full max-w-xs" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div>
                <button type="submit" className="btn btn-active btn-success">Login</button>
            </div>
        </form>
        <span className="register-link">New user?
            <Link to="/auth/registration">
            <button className="btn btn-link">Registration!</button>
            </Link>
        </span>
    </div>
}

export default UsernamePasswordLoginForm