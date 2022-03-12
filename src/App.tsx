import React from 'react';
import { Route,Routes,BrowserRouter,useParams } from 'react-router-dom'

import { UserContextProvider } from './context/userContext'

import { Home } from './pages/home'
import { Room } from './pages/room'
import { AdminRoom } from './pages/adminRoom'

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/room/:id' element={<Room/>} />
          <Route path='/admin/room/:id' element={<AdminRoom/>} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
