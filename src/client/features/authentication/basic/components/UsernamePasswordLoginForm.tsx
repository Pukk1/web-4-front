import * as React from "react";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {printError, useStore} from "../../../../context/store";
import {loginApiCall} from "../services/basicAuth";
import jwtDecode from "jwt-decode";

export interface AuthToken {
    name: string;
}

const UsernamePasswordLoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    const setAccessToken = useStore(state => state.setAccessToken)
    const setCurrentAccount = useStore(state => state.setCurrentAccount)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        loginApiCall(username, password)
            .then(response => {
                const token = response.headers['authorization']
                const accountName = jwtDecode<AuthToken>(token)['name'];

                setAccessToken(token)
                setCurrentAccount({name: accountName})
                navigate("/redirect/auth?token=" + token)
            })
            .catch(error => {
                printError(error)
            })
    }

    return <div className="login-form">
        <form onSubmit={handleSubmit}>
            <input name="login" type="text" placeholder="Name" value={username}
                   onChange={(event) => setUsername(event.target.value)}/>
            <input name="password" type="password" placeholder="Password" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Save</button>
        </form>
    </div>
}

export default UsernamePasswordLoginForm