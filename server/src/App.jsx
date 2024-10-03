import React from 'react'
import './App.css'
import Navbar from './Compoonents/Navbar'
import Subcription from './Compoonents/Subcription'
import { Route, Routes } from 'react-router-dom'
import Client from './Compoonents/Client'
import Login from './Compoonents/Login'
import Register from './Compoonents/Register'
import Ai from './Compoonents/Ai'
import Admin from './Compoonents/Admin'
import Blog from './Compoonents/Blog'
import ImgText from './Compoonents/ImgText'
import ImgImg from './Compoonents/ImgImg'
import TextImg from './Compoonents/TextImg'
import ProInfo from './Compoonents/ProInfo'
import RegisterInfo from './Compoonents/RegisterInfo'
import VerifyId from './Compoonents/VerifyId'
import History from './Compoonents/History'
import Userdata from './Compoonents/Userdata'
import Post from './Compoonents/Post'
import GetBlog from './Compoonents/GetBlog'

function App() {

  return (
    <>
    <div className='parent w-[100vw] relative flex flex-col'>
    <Navbar />
    <div className='h-auto mb-14'>
    <Routes>
      <Route path='/' element={<Client />}/>
      <Route path='/ai'element={<Ai />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/pricing' element={<Subcription />}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path='/blog' element={<Blog />}/>
      <Route path='/history' element={<History />}/>
      <Route path='/ai/img-text' element={<ImgText />}/>
      <Route path='/ai/img-img' element={<ImgImg />}/>
      <Route path='/ai/text-img' element={<TextImg />}/>
      <Route path='/profile-info' element={<ProInfo />}/>
      <Route path='/register-info' element={<RegisterInfo />}/>
      <Route path='/verify-id/:email' element={<VerifyId />} />
      <Route path='/admin/user/:email' element={<Userdata />}/>
      <Route path='/admin/post' element={<Post />}/>
      <Route path="/getblog/:id" element={<GetBlog />}/>
    </Routes>
    </div>
    </div>
    </>
  )
}

export default App
