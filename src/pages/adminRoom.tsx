import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { HiOutlineDuplicate } from 'react-icons/hi'
import {useUser} from '../hook/useUser'
import {database} from '../services/firebase'
import {onValue, ref,set, push ,onChildAdded} from 'firebase/database'
import '../styles/pages/Room.scss'

export function AdminRoom() {

    let { id } = useParams();

    const navigate = useNavigate()
    const {user} = useUser()
    const [adminIdRoom,setAdminIdRoom] = useState<any>()
    const [messages,setMessages] = useState<any>([])
    const [message,setMessage] = useState<any>()
    const [roomName,setRoomName] = useState<string>()

    useEffect(()=>{
        const idRef = ref(database,`rooms/${id}/idAdmin`)
        onValue(idRef, (snapshot) => {
            const data = snapshot.val();
            setAdminIdRoom(data)
        })

        const closeRef = ref(database,`rooms/${id}/isClose`)
        onValue(closeRef,(snapshot)=>{
            if(snapshot.val() === true) {
                navigate('/')
                return
            }
        })

        const nameRef = ref(database,`rooms/${id}/name`)
        onValue(nameRef,(data)=>{
            setRoomName(data.val())
        })
        
        const questionsRef= ref(database,`rooms/${id}/questions`)
        onChildAdded(questionsRef,(data)=>{
            setMessages((prevArry:any)=>[data.val(),...prevArry])
        })
    },[])

    const handleSendMensage = (e:any)=> {
        e.preventDefault()
        console.log('..')
        const date = new Date()
        const minutes = date.getMinutes()
        const hour = date.getHours()

        const roomRef= ref(database,`rooms/${id}/questions`)
        const postListRef = ref(database, `rooms/${id}/questions`)

        const newPostRef = push(postListRef)

        const contentMessage = {
            message:message,
            id: newPostRef.key,
            time:`${hour}:${minutes}`, 
            like: {
                count:0,
                users:[]
            },
            author:{
                name: user.name,
                avatar: user.avatar,
            }
        }

        set(newPostRef,contentMessage)
    }


    const handleCloseRoom = ()=> {  
        set(ref(database,`rooms/${id}`),{
            isClose:true
        })
    }

    const handleExitRoom = ()=> {
        navigate(`/`)
    }

    const handleCopyToClipboard = ()=> {
        navigator.clipboard.writeText(`${id}`);
    }

    return(
        <div id="Room">
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
            <div className="send-questions-content">
                <div className="form-ask-content">
                    <h1>{roomName}</h1>
                    <form onSubmit={handleSendMensage}>
                       <div className="form-content">
                            <textarea className='send-question-area' 
                            onChange={(e:any)=>{setMessage(e.target.value)}}
                            placeholder={'Coloque sua pergunta aqui.'}
                            ></textarea>
                       </div>
                        <div className="content-button">
                        <div className="user-content">
                            <div className="image-content-user">
                                <img src={user.avatar} 
                                referrerPolicy='no-referrer'
                                alt="foto de perfil do administrador da sala." />
                            </div>
                            <p>
                                {user.name}
                            </p>
                        </div>
                        <button className='send-button' type='submit'>Enviar pergunta</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="question-feed">
                {messages.map((value:any,key:any)=>{
                    return (
                        <div className="container-user" key={key}>
                            <div className="image-and-name-content" key={key}>
                                <div className="user-infos-content">
                                    <img referrerPolicy='no-referrer' src={value.author.avatar} alt="imagem do usúario"/>
                                    <p>{value.author.name}</p>
                                </div>
                               
                                <div className="time-content">
                                    <span>{value.time}</span>
                                </div>
                            </div>
                            <div className="message-content">
                                <p>{value.message} </p>   
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
