import * as React from "react"
import {GOOGLE_AUTH_URL, VK_AUTH_URL} from "../../../../data/constants"

const OAuth2Form = () => {
    return <div className="oauth2-form">
        <div>
            <div className="tooltip" data-tip="Auth with Google">
                <a href={GOOGLE_AUTH_URL}>
                    <button>
                        <img src={'/dist/images/google-logo.png'} alt="Google"/>
                    </button>
                </a>
            </div>
        </div>
        <div>
            <div className="tooltip" data-tip="Auth with Vk">
                <a className="vk-auth" href={VK_AUTH_URL}>
                    <img src={'/dist/images/vk-logo.png'} alt="Auth with Vk"/>
                </a>
            </div>
        </div>
    </div>
}

export default OAuth2Form