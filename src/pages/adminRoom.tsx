import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {auth} from '../services/firebase'
import logo from '../assets/images/logo.png'
import { HiOutlineDuplicate } from 'react-icons/hi'
import { onAuthStateChanged } from 'firebase/auth'
import {useUser} from '../hook/useUser'
import {database} from '../services/firebase'
import {onValue, ref, child,set, push, get ,onChildAdded, onChildChanged, update} from 'firebase/database'
import '../styles/pages/Room.scss'

export function AdminRoom() {

    let { id } = useParams();

    const navigate = useNavigate()
    const {user} = useUser()
    const [adminIdRoom,setAdminIdRoom] = useState<any>()
    const [userCurrent,setUserCurrent] = useState<any>()
    const [messages,setMessages] = useState<any>([])
    const [roomCode,setRoomCode] = useState<any>()
    const [message,setMessage] = useState<any>()

    useEffect(()=>{
        
        const isOpenRef = ref(database,`rooms/${id}/isOpen`)
        onValue(isOpenRef,(snapshot)=>{
            const data = snapshot.val()
            if(data === false) {
                navigate(`/`)
                return false
            }
        })

        const idRef = ref(database,`rooms/${id}/idAdim`)
        onValue(idRef, (snapshot) => {
            const data = snapshot.val();
            setAdminIdRoom(data)
        })
        
        const questionsRef= ref(database,`rooms/${id}/questions`)
        onChildAdded(questionsRef,(data)=>{setMessages((prevArry:any)=>[...prevArry,data.val()])})
    },[])

    const handleSendMensage = (e:any)=> {
        e.preventDefault()
        const contentMessage = {
            message:message,
            author:{
                name: user.name,
                avatar: user.avatar,
            }
        }

        const roomRef= ref(database,`rooms/${id}/questions`)
        const postListRef = ref(database, `rooms/${id}/questions`)
        const newPostRef = push(postListRef)
        set(newPostRef,contentMessage)
    }


    const handleCloseRoom = ()=> {
        const roomRef = ref(database,`rooms/${id}`)
        const isOpenRef = ref(database,`rooms/${id}/isOpen`)

        const updates:any = {}
        updates[`rooms/${id}/isOpen`] =  `...`
        
        update(ref(database),updates)
    }

    const handleExitRoom = ()=> {
        navigate(`/`)
    }

    const handleCopyToClipboard = ()=> {
        navigator.clipboard.writeText(`${id}`);
    }

    return(
        <div id="Room">
            <div className="messages-area">
                <header>
                    <div className="logo-content">
                        <img src={logo} alt="imagem logo" />
                    </div>
                    <div className="info-rooms-content">
                        <button className="clipboard-room" onClick={handleCopyToClipboard}>
                            <span><HiOutlineDuplicate/></span>
                            <p>{id}</p>
                        </button>
                        <button className="exit-room" onClick={handleExitRoom}>
                            <p>Sair da sala</p>
                        </button>
                        <button className="close-room" onClick={handleCloseRoom}>
                            <p>Fechar sala</p>
                        </button>
                    </div>
                </header>
            </div>
            <div className="send-questions-content">
                <div className="user"></div>
                <div className="form-ask-content">
                    <h1>Sala de Perguntas e Respostas</h1>
                    <form onSubmit={handleSendMensage}>
                       <div className="form-content">
                            <input type="text" placeholder='Coloque sua pergunta aqui' onChange={(e:any)=>{setMessage(e.target.value)}}/>
                       </div>
                        <button>Enviar pergunta</button>
                    </form>
                </div>
            </div>
            <div className="question-feed">
                {messages.map((value:any,key:any)=>{
                    return (
                        <div className="container-user" key={key}>
                            <div className="image-and-name-content" key={key}>
                                <p>{value.author.name}</p>
                                <img referrerPolicy='no-referrer' src={value.author.avatar} alt="imagem do usúario"/>
                            </div>
                            <div className="message-content">
                                {value.message}    
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
