import axios from "axios";
import {hashingPassword} from "../utils/hash";
import {AuthResponseType, DotType, StateType, TokensType} from "../../types";
import {connect} from "./webSocket";

const port = "7999"

export const registration = (state: StateType, username: string, password: string, setMessage: (mes: string) => void, navigate: Function) => {

    axios({
        method: 'post',
        url: `http://localhost:${port}/checkUser`,
        params: {
            username: username
        }
    }).then((response) => {
        if (response.data === true) {
            setMessage('Пользователь с таким именем уже есть')
        } else {
            axios({
                method: 'post',
                url: `http://localhost:${port}/generateTokenAndSalt`,
                params: {
                    username: username
                }
            }).then((response) => {
                let salt = response.data.salt
                let token = response.data.token
                axios({
                    method: 'put',
                    url: `http://localhost:${port}/password`,
                    params: {
                        token: token,
                        password: hashingPassword(password, salt)
                    }
                }).then((response) => {
                    authorisation(state, username, password, setMessage, navigate)
                }).catch((exception) => {
                    setMessage('пароль не был добавлен на сервер. Сбой в регистрации')
                })
            }).catch((exception) => {
                setMessage('соль не была сгенерирована на сервере. Сбой в регистрации')
                //доделать update tokens необходимо удалять из базы пользователей, у которых не стоит пароля для повторной попытки их добавления
            });
        }
    })
}

export const sendDot = (dot: DotType, tokens: TokensType, errCallBack: Function) => {
    axios({
        method: 'put',
        url: `http://localhost:${port}/addDot`,
        params: {
            token: tokens.accessToken,
            x: dot.x,
            y: dot.y,
            r: dot.r
        }
    }).then(
        () => {
            console.log('Точка успешно добавлена')
        }
    ).catch(
        (err) => {
            console.log(err)
            errCallBack()
        }
    )
}

export const updateDots = (state: StateType, errCallBack: Function) => {
    axios({
        method: 'post',
        url: `http://localhost:${port}/getMyDots`,
        params: {
            accessToken: state.getTokens().accessToken,
        }
    }).then((response) => {
            state.setDots(response.data)
        }
    ).catch(
        (err) => {
            console.log(err)
            errCallBack()
        }
    )
}

export const updateTokens = (state: StateType, callBack: Function, errCallBack: Function) => {
    axios({
        method: 'post',
        url: `http://localhost:${port}/checkToken`,
        params: {
            token: state.getTokens().accessToken,
        }
    }).then((response) => {
            if (response.data === true) {
                console.log('проверил access, он валиден. Ошибка не в токенах')
            } else {
                console.log('будем обновлято токены')
                axios({
                    method: 'post',
                    url: `http://localhost:${port}/updateTokens`,
                    params: {
                        refreshToken: state.getTokens().refreshToken,
                    }
                }).then((response) => {
                    if (response.data === "") {
                        // //выкидывать на экрын логирования
                        errCallBack()
                    } else {
                        state.setTokens({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken})
                        callBack()
                    }
                })
            }
        }
    ).catch(() => {
        console.log('ошибка при проверке access')
    })
}

export const signByVk = (state: StateType, navigate: Function) => {
    (<any>window).VK.Auth.login((user: { session: { mid: string, sig: string, expire: string, secret: string, sid: string } }) => {
        axios({
            method: 'post',
            url: `http://localhost:${port}/signByVk`,
            params: {
                mid: user.session.mid,
                parameters: `expire=${user.session.expire}mid=${user.session.mid}secret=${user.session.secret}sid=${user.session.sid}`,
                sig: user.session.sig
            }
        }).then((response) => {
            logIn(state, {
                userId: response.data.userId,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            }, navigate)
        })
    })
}

export const singByGoogle = (state: StateType, navigate: Function) => {
    const googleAuth = (<any>window).gapi.auth2.getAuthInstance()
    googleAuth.signIn(
        {
            scope: 'profile email'
        }
    ).then((user: { vc: { id_token: string } }) => {
        axios({
            method: 'post',
            url: `http://localhost:${port}/signByGoogle`,
            params: {
                idTokenString: user.vc.id_token
            }
        }).then((response) => {
            logIn(state, {
                userId: response.data.userId,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            }, navigate)
        })
    })
}

export const authorisation = (state: StateType, username: string, password: string, setMessage: (mess: string) => void, navigate: Function/*setTokens: (tokens: TokensType) => {}, navigate: Function, setUserId: (userId: number) => {}*/) => {
    axios({
        method: 'post',
        url: `http://localhost:${port}/checkUser`,
        params: {
            username: username
        }
    }).then((response) => {
        if (response.data === false) {
            setMessage('Пользователя с таким именем нет')
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:7999/getTokenAndSalt',
                params: {
                    username: username
                }
            }).then((response) => {
                let salt = response.data.salt
                let token = response.data.token
                axios({
                    method: 'post',
                    url: 'http://localhost:7999/password',
                    params: {
                        token: token,
                        password: hashingPassword(password, salt)
                    }
                }).then((response) => {
                    logIn(state, {
                        userId: response.data.userId,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }, navigate)
                }).catch((exception) => {
                    setMessage('пароль не был сравнен на сервер. Сбой в авторизации')
                })
            }).catch((exception) => {
                setMessage('соль не была получена от сервера. Сбой в авторизации')
                //доделать update tokens необходимо удалять из базы пользователей, у которых не стоит пароля для повторной попытки их добавления
            });
        }
    })
}

const logIn = (state: StateType, response: AuthResponseType, navigate: Function) => {
    state.setTokens({accessToken: response.accessToken, refreshToken: response.refreshToken})
    state.setUserId(response.userId)
    state.setAuthorized(true)
    connect(state, () => {
            updateDots(state, () => {
                console.log("err with dot updating")
            })
        },
        () => {
            console.log("err with connecting")
        }, (window as any).port
    )
    updateDots(state, () => {
        console.log("err with dot updating during logIn time")
    })
    navigate("/main")
}