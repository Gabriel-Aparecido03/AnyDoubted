import React,{useEffect, useState} from 'react'
import '../styles/pages/Home.scss'
import {auth,provider,database} from '../services/firebase'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import logo from '../assets/images/logo.png'
import background from '../assets/images/background-home.jpg'
import {useNavigate} from 'react-router-dom'
import {get,child,ref,set} from 'firebase/database'
import { useUser } from '../hook/useUser'

export function Home() {
    const [openFieldJoinRoom,setopenFieldJoinRoom] = useState<any>()
    const [openFieldCreateRoom,setOenFieldCreateRoom] = useState<any>()
    const [displayJoin,setDisplayJoin] = useState<any>('none')
    const [room,setRoom] = useState<any>()
    const [roomId,setRoomId] = useState<any>()

    const {user,handleGoogleSignIn} = useUser()
    const navigate = useNavigate()

    const handleRoomId = (e:any)=>{
        setRoomId(e.target.value)
    }

    async function handleMakingRoom(){
        if(!user) {
            await handleGoogleSignIn()
        }
        navigate(`/admin/room/${roomId}`)
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

    const createElement = ()=>{
        setopenFieldJoinRoom(()=>{
            return (
                <form onSubmit={ handleJoinRoom}>
                    <input type="text" placeholder='Coloque aqui seu código de sala' onChange={handleRoomId}/>
                    <button><p>Entrar na sala</p></button>
                </form>
            )
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
                        <button className='create-button' onClick={handleMakingRoom}><p>Criar uma sala</p></button>
                        <button className='join-button'
                        onClick={()=>{setDisplayJoin('block')}}
                        
                        ><p>Entrar em uma sala</p></button>
                    </div>
                    <div className="input-content" style={{display:`${displayJoin}`}}>
                    <form onSubmit={ handleJoinRoom}>
                        <input type="text" placeholder='Coloque aqui seu código de sala' onChange={handleRoomId}/>
                        <button><p>Entrar na sala</p></button>
                    </form>
                    </div>
                </div>
            </main>
        </div>
    )
}