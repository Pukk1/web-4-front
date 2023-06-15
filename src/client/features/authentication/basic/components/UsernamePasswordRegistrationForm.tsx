import * as React from "react";

const UsernamePasswordRegistrationForm = () => {
    return <div className="registration-form">
        <form>
            <input name="name" type="text"/>
            <input name="login" type="text"/>
            <input name="password" type="password"/>
            <button>Save</button>
        </form>
    </div>
}

export default UsernamePasswordRegistrationForm