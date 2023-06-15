import {create} from "zustand";
import {DotType} from "../features/areacheck/types/Point";
import {sendDot} from "../features/areacheck/services/checkArea";
import {AccessTokenType} from "./store";
import {response} from "express";

export interface AreaStore {

    dots: Array<DotType>

    setDot: (dot: DotType) => void
    setDots: (dots: Array<DotType>) => void
    sendDot: (dot: DotType, accessToken: AccessTokenType) => void

    message: string,
    xErr: string,
    yErr: string,
    rErr: string,
    rParam: number,
    setMessage: (mess: string) => void
    setXErr: (mess: string) => void
    setYErr: (mess: string) => void
    setRErr: (mess: string) => void
    setRParam: (r: number) => void
}

export const useAreaStore = create<AreaStore>((set, get) => ({

    dots: [],

    setDots: (dots: Array<DotType>) => set((state: AreaStore) => {
        state.dots = dots
        return {}
    }),
    setDot: (dot: DotType) => set((state: AreaStore) => ({
        dots: [dot].concat(state.dots)
    })),

    sendDot: (dot: DotType, token: AccessTokenType) => set((state: AreaStore) => {
        sendDot(dot, token)
            .then(response => {
                    if (response.status == 200) {
                        state.setDot(dot)
                    }
                }
            )
            .catch(reason => console.log(reason))
        return {}
    }),

    message: "",
    xErr: "",
    yErr: "",
    rErr: "",
    rParam: 1,
    setMessage: (mess: string) => set((state: AreaStore) => ({message: mess})),
    setXErr: (mess: string) => set((state: AreaStore) => ({xErr: mess})),
    setYErr: (mess: string) => set((state: AreaStore) => ({yErr: mess})),
    setRErr: (mess: string) => set((state: AreaStore) => ({rErr: mess})),
    setRParam: (r: number) => set((state: AreaStore) => ({rParam: r})),
}))