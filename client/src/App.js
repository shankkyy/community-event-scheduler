import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import {React} from 'react'
import './App.css'
import { Route,Routes} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {

  return (
    
   <Routes>
    <Route path ='/' default element={<Register/>}></Route>
    <Route path ='/login' element={<Login/>}></Route>
    <Route path ='/home/*' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>

  </Routes>
  )
}

export default App
