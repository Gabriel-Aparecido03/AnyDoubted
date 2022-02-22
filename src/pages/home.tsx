import React from 'react'
import '../styles/pages/Home.scss'

import logo from '../assets/images/logo.png'
import background from '../assets/images/background-home.svg'

export function Home() {
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
                        <button className='create-button'><p>Criar uma sala</p></button>
                        <button className='join-button'><p>Entrar em uma sala</p></button>
                    </div>
                </div>
            </main>
        </div>
    )
}