import { Button } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyId = () => {

    const [userOtp,setUserOtp] = useState()
    const navigate = useNavigate()
    const params = useParams()
    console.log("our params", params.email)

    useEffect(()=>{
        axios.post(`http://localhost:3000/send-otp`, {email: params?.email}).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const verifyotp = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:3000/verfiy-otp`, {userOtp}).then((res)=>{
            console.log(res.data)
            if(res.data?.success){
            axios.post(`http://localhost:3000/verified/${params?.email}`).then((res)=>{
                console.log("verification", res.data)
            }).catch((err)=>{
                console.log("verification", err)
            })
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(err)
        })
    
    }


    


  return (
    <>
    <div className="pt-[140px]"></div>
    <div>
        <input type="number" name="" id="" placeholder='enter onter otp here' value={userOtp} onChange={(e)=>setUserOtp(e.target.value)} />
        <Button className='ac-bg' onClick={(e) => { verifyotp(e) }}>Verify otp</Button>
    </div>
    </>

  )
}

export default VerifyId