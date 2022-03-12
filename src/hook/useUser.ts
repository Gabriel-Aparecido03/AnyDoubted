import React,{useContext} from 'react'
import { UserContext } from '../context/userContext'

export function useUser() {
    const value = useContext(UserContext)
    return value 
}