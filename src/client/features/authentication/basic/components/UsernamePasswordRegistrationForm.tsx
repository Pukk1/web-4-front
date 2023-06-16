import * as React from "react";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerApi} from "../services/basicAuth";
import {printError} from "../../../../context/store";

const UsernamePasswordRegistrationForm = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        registerApi(name, username, password)
            .then(response => {
                navigate("/auth")
            })
            .catch(error => {
                if (error.response.status == 409) {
                    setErrMessage("Username already using")
                } else {
                    printError(error)
                }
            })
    }

    return <div className="registration-form">
        <form onSubmit={handleSubmit}>
            <div>
                <span style={{fontSize: "large", color: "red"}}>{errMessage}</span>
            </div>
            <div>
                <input name="name" type="text" placeholder="Name" value={name}
                       onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
                <input name="username" type="text" placeholder="Username" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div>
                <input name="password" type="password" placeholder="Password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div>
                <button type="submit" className="btn btn-active btn-success">Register</button>
            </div>
        </form>
        <span className="login-link">Have account?
            <Link to="/auth">
                <button className="btn btn-link">Login!</button>
            </Link>
        </span>
    </div>
}

export default UsernamePasswordRegistrationForm