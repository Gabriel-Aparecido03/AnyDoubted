import React,{useState} from 'react'
import '../styles/pages/Home.scss'
import {auth,provider} from '../services/firebase'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import logo from '../assets/images/logo.png'
import background from '../assets/images/background-home.svg'

export function Home() {
    const [elementRoom,setElementRoom] = useState<any>()
    

    function handleJoinRoom(){
        signInWithPopup(auth,provider).then((result)=>{
            console.log(result.user)
        })
    } 

    const createElement = ()=>{
        setElementRoom(()=>{
            return (
                <form action="">
                    <input type="text" placeholder='Coloque aqui seu código de sala'/>
                    <button onClick={handleJoinRoom}><p>Entrar na sala</p></button>
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
                    </div>
                    <div className="buttons-content">
                        <button className='create-button' onClick={handleJoinRoom}><p>Criar uma sala</p></button>
                        <button className='join-button'
                        onClick={createElement}
                        
                        ><p>Entrar em uma sala</p></button>
                    </div>
                    <div className="input-content">
                       {elementRoom}
                    </div>
                </div>
            </main>
        </div>
    )
}