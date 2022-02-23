import {useContext} from 'react'
import { authContext } from '../context/authContext'

export function useAuth() {
    const value = useContext(authContext)
    
    return value
}
