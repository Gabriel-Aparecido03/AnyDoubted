import React from 'react';
import { Route,Routes,BrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Room } from './pages/room'
import { CreateRoom } from './pages/createRoom'
import { AdminRoom } from './pages/adminRoom'

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/new/room' element={<CreateRoom/>} />
        <Route path='/room/:id' element={<Room/>} />
        <Route path='/admin/room/:id' element={<AdminRoom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
