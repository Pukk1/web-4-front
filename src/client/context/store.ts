import {create} from 'zustand';

export type AccessTokenType = string | null
export type CurrentAccountType = Account | null
export type LogOutType = () => void

export interface Account {
    name: string,
}

export interface Store {
    accessToken: AccessTokenType,
    currentAccount: CurrentAccountType,

    setAccessToken: (accessToken: AccessTokenType) => void
    setCurrentAccount: (currentAccount: CurrentAccountType) => void
    logOut: LogOutType
}

export const printError = (error: string) => {
    console.log(error)
}

export const useStore = create<Store>((set, get) => ({
    accessToken: null,
    currentAccount: null,

    setAccessToken: (accessToken) =>
        set((store: Store) => ({accessToken: accessToken})),
    setCurrentAccount: (currentAccount: CurrentAccountType) =>
        set((store: Store) => ({currentAccount: currentAccount})),

    logOut: () => set((store: Store) => {
        store.setCurrentAccount(null)
        store.setAccessToken(null)
        return {}
    }),
}))