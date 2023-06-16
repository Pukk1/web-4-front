import * as React from "react"
import {GOOGLE_AUTH_URL, VK_AUTH_URL} from "../../../../data/constants"
// import googleLogo from '../../../../data/img/google-logo.png'
// import vkLogo from '../../../../data/img/vk-logo.png'

const OAuth2Form = () => {
    return <div className="oauth2-form">
        <a className="google-auth" href={GOOGLE_AUTH_URL}>
            <img src={'/dist/images/google-logo.png'} alt="Google"/> Auth with Google</a>
        <a className="vk-auth" href={VK_AUTH_URL}>
            <img src={'/dist/images/vk-logo.png'} alt="Vk"/> Auth with Vk</a>
    </div>
}

export default OAuth2Form