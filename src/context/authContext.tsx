import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React,{createContext ,ReactNode} from 'react'
import { auth,provider } from '../services/firebase'

type AuthContextType = {
    signInWithGoogle: any
}

type AuthContextProviderProps = {
    children: ReactNode;
  }

export const authContext = createContext({} as AuthContextType)

export function authContextProvider(props:AuthContextProviderProps) {

    const signInWithGoogle = 2

    return (
        <authContext.Provider value={{ signInWithGoogle }}>
            {props.children}
        </authContext.Provider>
    )
}