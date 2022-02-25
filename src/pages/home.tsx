import React,{useEffect, useState} from 'react'
import '../styles/pages/Home.scss'
import {auth,provider,database} from '../services/firebase'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import logo from '../assets/images/logo.png'
import background from '../assets/images/background-home.svg'
import {useNavigate} from 'react-router-dom'
import {get,child,ref,set} from 'firebase/database'

export function Home() {
    const [openFieldJoinRoom,setopenFieldJoinRoom] = useState<any>()
    const [openFieldCreateRoom,setOenFieldCreateRoom] = useState<any>()
    const [displayJoin,setDisplayJoin] = useState<any>('none')
    const [user,setUser] = useState<any>()
    const [room,setRoom] = useState<any>()
    const [roomId,setRoomId] = useState<any>()


   
    const navigate = useNavigate()

    const handleRoomId = (e:any)=>{
        setRoomId(e.target.value)
    }

    async function handleMakingRoom(){
        await signInWithPopup(auth,provider).then((result)=>{
            const {displayName,photoURL,uid} = result.user
            if(!displayName || !photoURL) {
                return false
            }
            const idRoom = uid[1]+uid[2]+uid[3]+uid[4]+uid[5]+displayName[2]+displayName[0]+displayName[8]
            setUser({
                name: displayName,
                idAdmin: uid
            })
            setRoom({
                idRoom:uid[1]+uid[2]+uid[3]+uid[4]+uid[5]+displayName[2]+displayName[0]+displayName[8],
                isOpen:true
            })
            const refDatabase = ref(database)
            get(child(refDatabase,`rooms/${idRoom}`)).then((snapshot)=>{
                if(snapshot.exists()) {
                    console.log('This is room is alreay exist!')
                    return false
                }
                else {
                    set(ref(database,'rooms/'+idRoom),{
                        admin:displayName,
                        idAdim:uid,
                        roomCode:idRoom,
                        isOpen:true
                    })
                    navigate(`/admin/room/${idRoom}`)
                }
            })
        })
    } 

    async function handleJoinRoom(e:any) {
        console.log(roomId)
        e.preventDefault()
        await signInWithPopup(auth,provider).then((result)=>{
            const refDatabase = ref(database)
            const {displayName,photoURL,uid} = result.user
            if(!displayName || !photoURL) {
                return false
            }
            setUser({
                name: displayName,
                userId:uid,
                isAdmin:false
            })
            get(child(refDatabase,`rooms/${roomId}`)).then((snapshot)=>{
               if(snapshot.exists()) {
                   navigate(`/room/${roomId}`)
               }
               else {
                   console.log('This room isnt exist or closed')
               }
            })
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
                        <h1>Sua sala de perguntas &amp; respostas totalmente gratuita.nafVObGA</h1>
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