import React,{useEffect, useState} from 'react'
import {auth} from '../services/firebase'

export function Room() {
    const [messageContainer,setMessageContainer] = useState<any>()

    useEffect(()=>{
        const user = auth.currentUser
        console.log(user)
    })
    return(
        <div id="Room">
            <div className="messages-area">

            </div>
        </div>
    )
}