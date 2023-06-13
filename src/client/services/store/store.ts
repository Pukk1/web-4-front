import create from 'zustand';

interface Account {
    name: string,
}

interface Store {
    authenticated: boolean,
    accessToken: string | null,
    currentAccount: Account | null,
}

export const useStore = create<Store>((set) => ({
    authenticated: false,
    accessToken: null,
    currentAccount: null,
}));