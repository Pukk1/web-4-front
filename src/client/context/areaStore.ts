import {create} from "zustand";
import {NewPoint, StoredPoint} from "../features/areacheck/types";
import {cleanDots, sendDot} from "../features/areacheck/services/checkArea";
import {Access, AccessToken} from "./store";
import {response} from "express";

export type AreaStore = {

    dots: Array<StoredPoint>

    setDot: (dot: StoredPoint) => void
    setDots: (dots: Array<StoredPoint>) => void
    storeDot: (dot: NewPoint, accessToken: AccessToken) => void

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

    cleanDots: (access: Access) => void
}

export const useAreaStore = create<AreaStore>((set, get) => ({

    dots: [],

    setDots: (dots: Array<StoredPoint>) => set((state: AreaStore) => {
        state.dots = dots
        return {}
    }),
    setDot: (dot: StoredPoint) => set((state: AreaStore) => ({
        dots: [dot].concat(state.dots)
    })),

    storeDot: (dot: NewPoint, token: AccessToken) => set((state: AreaStore) => {
        sendDot(dot, token)
            .then(response => {
                    if (response.status == 200) {
                        const data = response.data
                        const newPoint: StoredPoint = {
                            id: data.id,
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
    cleanDots: (access: Access) => set((state: AreaStore) => {
        cleanDots(access)
            .then(response => {
                if (response.status == 200){
                    state.setDots([])
                }
            })

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