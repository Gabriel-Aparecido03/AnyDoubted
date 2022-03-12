import React,{createContext,useState,ReactNode,useEffect} from 'react'
import {ref,set,} from 'firebase/database'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import {database,auth,provider} from '../services/firebase'

type PropsUserProvider = {
    children : ReactNode
}

type UserContext = {
    user: any,
    handleGoogleSignIn : ()=>Promise<void>
}

export const UserContext = createContext({} as UserContext)

export function UserContextProvider(props:PropsUserProvider) {

    const [user,setUser] = useState<any>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            const { displayName, photoURL, uid } = user
    
            if (!displayName || !photoURL) {
              throw new Error('Missing information from Google Account.');
            }
    
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
    
        return () => {
          unsubscribe();
        }
      }, []) 

    async function handleGoogleSignIn() {
        await signInWithPopup(auth,provider).then((result)=>{
            const { displayName,uid,photoURL } = result.user
            if(!photoURL || !uid) {
                console.log('Missing informations from Google Login Services,plase try again,if dont work contact the support.')
                return false
            }
            setUser({
                name:displayName,
                id:uid,
                photo:photoURL
            })
        })
    }

    return (
        <UserContext.Provider value={{user,handleGoogleSignIn}}>
            <div>{props.children}</div>
        </UserContext.Provider>
    )
}