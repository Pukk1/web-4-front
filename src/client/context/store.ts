import create from 'zustand';

export type AccessTokenType = string | null
export type CurrentAccountType = Account | null
export type LogOutType = () => void

export interface Account {
    name: string,
}

export interface Store {
    accessToken: AccessTokenType,
    currentAccount: CurrentAccountType,

    _setAccessToken: (accessToken: AccessTokenType) => void
    _setCurrentAccount: (currentAccount: CurrentAccountType) => void
    logOut: LogOutType
}

export const useStore = create<Store>((set, get) => ({
    accessToken: null,
    currentAccount: null,

    _setAccessToken: (accessToken) =>
        set((store: Store) => ({accessToken: accessToken})),
    _setCurrentAccount: (currentAccount: CurrentAccountType) =>
        set((store: Store) => ({currentAccount: currentAccount})),

    logOut: () => set((store: Store) => {
        store._setCurrentAccount(null)
        store._setAccessToken(null)
        return {}
    }),

}))