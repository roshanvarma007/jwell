import axios from 'axios'
import { useAuth } from '../../store/auth'
import React, { useState } from 'react'

const ProInfo = () => {

  const {user} = useAuth()

  
  // axios.post("http://localhost:3000/update-user/y5_DpgdCkw",{
  //   country: "America",
  //   firstName: "mohd Saif"
  //  }).then((res)=>{
  //   console.log(res.data)
  //  }).catch((err)=>{
  //   console.log(err)
  //  })


  return (
   <>
   <div className='pt-[120px]'></div>
   <div className='flex justify-center items-center'>
        <div className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl flex flex-col'>
        <h1 className='text-center mb-5 luxuria font-bold text-lg'>Profile information</h1>
            <span className='luxuria my-3 font-bold'>First name</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value={user?.userData?.firstName ? user?.userData?.firstName : ""} />
            <span className='luxuria my-3 font-bold'>Last name</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value={user?.userData?.lastName ? user?.userData?.lastName : ""} />
            <span className='luxuria my-3 font-bold'>Email</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value={user?.userData?.email ? user?.userData?.email : ""} />
            <span className='luxuria my-3 font-bold'>Phone number</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value={user?.userData?.phone ? user?.userData?.phone : ""} />
            <span className='luxuria my-3 font-bold'>Country</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value={user?.userData?.country ? user?.userData?.country: ""} />
            <span className='luxuria my-3 font-bold'>Subscription</span>
            <input type="text" className='py-2 shadow-lg rounded-md pl-2 border border-gray-500 outline-none poppins mb-4' readOnly value="Monthly Basic version" />
        </div>
   </div>
   </>
  )
}

export default ProInfo