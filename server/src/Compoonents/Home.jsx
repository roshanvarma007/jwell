import React from 'react'
import IMAGES from '../images'
import { useAuth } from '../../store/auth'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {user} = useAuth()
  const navigate = useNavigate()

  const validateUser = () =>{
    if(user)
      navigate("ai/img-text")
    else
      navigate("/login")
    
  }
 

  return (
    <>
      <div className='pt-[100px] max-md:pt-[70px]'></div>
      <section className='w-full h-[80vh] flex bg-black hero relative'>
        <div className="  flex items-center max-md:w-full max-md:justify-center absolute left-0 top-1/4 z-20">
          <div className=' ml-6 max-md:text-center mt-16 '>
            <h1 className='text-white text-6xl luxuria max-md:text-5xl max-sm:text-3xl'>
              Where imagination
              <br className='max-md:hidden' /> meets reality</h1>
            <button className=' py-4 px-3  ac-bg poppins font-semibold rounded-full ml-5 my-5 text-white hover:bg-[#284e1f] transition-all' onClick={validateUser}>Explore Now</button>

          </div>
        </div>
        <img src={IMAGES.hero} className='w-[95%] z-10 img absolute h-full -right-10' alt="" />
      </section>
    </>
  )
}

// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=email%20profile&client_id=487161400249-k9nkdcsg8ul6cpuj05b7n5smobfj7ee9.apps.googleusercontent.com

export default Home