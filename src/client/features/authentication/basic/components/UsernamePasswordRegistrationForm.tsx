import * as React from "react";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerApi} from "../services/basicAuth";
import {printError} from "../../../../context/store";

const UsernamePasswordRegistrationForm = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        registerApi(name, username, password)
            .then(response => {
                navigate("/auth")
            })
            .catch(error => {
                printError(error)
            })
    }

    return <div className="registration-form">
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Name" value={name}
                   onChange={(event) => setName(event.target.value)}/>
            <input name="username" type="text" placeholder="Username" value={username}
                   onChange={(event) => setUsername(event.target.value)}/>
            <input name="password" type="password" placeholder="Password" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Register</button>
        </form>
        <span className="login-link">Have account? <Link to="/auth">Login!</Link></span>
    </div>
}

export default UsernamePasswordRegistrationForm