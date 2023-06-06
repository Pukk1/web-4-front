import * as React from "react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {StateType} from "../../types";

var stompClient:{connect:Function, subscribe:Function, connected: boolean, disconnect: Function};

export const connect = (state: StateType, callBack: Function, errCallBack: Function, port: string) => {
    let SockJScl = new SockJS(`http://localhost:7999/ws`);
    stompClient = Stomp.over(SockJScl);
    stompClient.connect({}, () => {
            onConnected(state.getUserId(), callBack)
        }
        , () => {
            console.log("err in webSocket connecting")
            errCallBack()
        });
};

const onConnected = (userId: number, callBack: Function) => {
    console.log("connected");

    stompClient.subscribe(
        "/user/" + userId + "/queue/messages",
        () => {
            console.log("Сообщение получено!")
            callBack()
        }
    );
};

export const disconnect = () => {
    if (stompClient !== undefined) {
        if (stompClient.connected) {
            stompClient.disconnect()
        }
    }
}