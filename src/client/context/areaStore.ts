import {create} from "zustand";
import {PointType} from "../features/areacheck/types/Point";
import {sendDot} from "../features/areacheck/services/checkArea";
import {AccessTokenType} from "./store";
import {response} from "express";

export interface AreaStore {

    dots: Array<PointType>

    setDot: (dot: PointType) => void
    setDots: (dots: Array<PointType>) => void
    sendDot: (dot: PointType, accessToken: AccessTokenType) => void

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

    setDots: (dots: Array<PointType>) => set((state: AreaStore) => {
        state.dots = dots
        return {}
    }),
    setDot: (dot: PointType) => set((state: AreaStore) => ({
        dots: [dot].concat(state.dots)
    })),

    sendDot: (dot: PointType, token: AccessTokenType) => set((state: AreaStore) => {
        sendDot(dot, token)
            .then(response => {
                    if (response.status == 200) {
                        const data = response.data
                        const newPoint : PointType = {
                            x: data.x,
                            y: data.y,
                            r: data.r,
                            hit: data.hit
                        }
                        state.setDot(newPoint)
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