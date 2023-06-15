import {create} from 'zustand';

export type AccessToken = string

export type Access = {
    accessToken: AccessToken,
    username: string,
    accountName: string,
}
export type CurrentAccess = Access | null

export type LogOut = () => void

export type Store = {
    currentAccount: CurrentAccess,

    // setAccessToken: (currentAccessToken: CurrentAccess) => void
    setCurrentAccess: (currentAccess: CurrentAccess) => void
    logOut: LogOut
}

export const printError = (error: string) => {
    console.log(error)
}

export const useStore = create<Store>((set, get) => ({
    accessToken: null,
    currentAccount: null,

    // setAccessToken: (accessToken) =>
    //     set((store: Store) => ({accessToken: accessToken})),
    setCurrentAccess: (currentAccount: CurrentAccess) =>
        set((store: Store) => ({currentAccount: currentAccount})),

    logOut: () => set((store: Store) => {
        store.setCurrentAccess(null)
        return {}
    }),
}))