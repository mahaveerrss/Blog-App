import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../src/appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
   
   const [loading,setLoading] = useState(true)
   const dispatch = useDispatch()

   useEffect(()=>{
    authService.getCurrentUser()
    .then((data)=>  {
      if(data){
        dispatch(login(data))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=> console.log(error)
    )
    .finally(()=>{
      setLoading(false)
    })
   },[])
    
  if(loading){
    return <div className='flex w-screen justify-center items-center'><h1>Loading...</h1></div>
  }

  return (
    <div>
     <Header/>
    <main>
      <Outlet/>
    </main>
      <Footer/>
    </div>
  )
}

export default App
