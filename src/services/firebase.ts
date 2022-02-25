import React from 'react'

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { GoogleAuthProvider,getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET     ,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_APP_ID
}

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()
const database = getDatabase()

export { provider,auth,database}