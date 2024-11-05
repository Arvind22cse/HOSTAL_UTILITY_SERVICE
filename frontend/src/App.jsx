import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Admin from './admin/Admin';
import Hostal from './pages/Hostal';
import Signinadmin from './admin/Signinadmin'
import Signupadmin from './admin/Signupadmin';
import Complaint from './pages/Complaint';
import View_complaint from './admin/View_complaint';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Hostal/>}/>     

        <Route path="/signin" element={<Signin/>}/>     
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signinadmin" element={<Signinadmin/>}/>     
        <Route path="/signupadmin" element={<Signupadmin/>}/>     
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/> 
        <Route path="/complaint" element={<Complaint/>}/>
        <Route path="/viewcomplaint" element={<View_complaint/>}/>

         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
