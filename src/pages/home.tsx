import React,{useEffect, useState} from 'react'
import { useUser } from '../hook/useUser'

import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import background from '../assets/images/background-home.jpg'

import '../styles/pages/Home.scss'

import {auth} from '../services/firebase'

import { get,child,ref,set } from 'firebase/database'
import { database } from '../services/firebase'


export function Home() {
    const [displayJoin,setDisplayJoin] = useState<string>('none')
    const [displayNameRoom,setDisplayNameRoom] = useState<string>('none')

    const [makeIdRoom,setMakeIdRoom] = useState<string>()

    const [roomId,setRoomId] = useState<string>()

    const [nameRoom,setNameRoom] = useState<string>()

    const {user,handleGoogleSignIn} = useUser()
    const navigate = useNavigate()

    const handleRoomId = (e:any)=>{
        setRoomId(e.target.value)
    }

    const handleNameRoom = (e:any) => {
        setNameRoom(e.target.value)
    }

    async function handleMakingRoom(e:any){
        e.preventDefault()

        if(nameRoom?.trim() === '') {
            // react toastify 
            return
        }
        if (!user) {
            await handleGoogleSignIn()
        }

        const date = new Date()
        const seconds = date.getSeconds()

        const idUser = auth.currentUser?.uid
        const idRoom = `${ idUser?.substring(0,5)}${seconds}`

        set(ref(database,`rooms/${idRoom}`),{
            name:nameRoom,
            idAdmin:idUser,
            idRoom:idRoom
        })

        navigate(`/admin/room/${idRoom}`)
    } 

    async function handleJoinRoom(e:any) {
        e.preventDefault()
        const databaseRef = ref(database)
        if(!user) {
            await handleGoogleSignIn()
        }
        get(child(databaseRef,`rooms/${roomId}`)).then((snapshot)=>{
            if(snapshot.exists()) {
                navigate(`/room/${roomId}`)
            }
        })
    }

    return (
        <div id="Home">
            <aside>
                <div className="image-content-aside">
                    <img src={background} alt="pessoa com dúvida conversando entre si." />
                </div>
            </aside>
            <main>
                <div className="main-content">
                    <div className="logo-content">
                        <img src={logo} alt="logo da AnyDoubted." />
                    </div>
                    <div className="intro-text-content">
                        <h1>Sua sala de perguntas &amp; respostas totalmente gratuita.</h1>
                        <p>Entre ou crie salas usando um conta Google.</p>
                    </div>
                    <div className="buttons-content">
                        <button className='create-button' onClick={()=>{
                            setDisplayNameRoom('grid')
                            setDisplayJoin('none')    
                            }}
                        ><p>Criar uma sala</p></button>
                        <button className='join-button'
                        onClick={()=>{
                            setDisplayJoin('grid')
                            setDisplayNameRoom('none')
                        }}
                        ><p>Entrar em uma sala</p></button>
                    </div>
                    <div className="input-content">
                        <form onSubmit={ handleJoinRoom} style={{display:`${displayJoin}`}}>
                            <input type="text" placeholder='Coloque aqui seu código de sala' onChange={handleRoomId}/>
                            <button><p>Entrar na sala</p></button>
                        </form>
                        <form onSubmit={handleMakingRoom} style={{display:`${displayNameRoom}`}}>
                            <input type="text" onChange={handleNameRoom} placeholder='Coloque o nome da sua sala aqui'/>
                            <button><p>Criar Sala</p></button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}