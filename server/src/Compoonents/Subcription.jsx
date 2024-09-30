import React, { useState } from 'react'
import Pricing from './Pricing'
import { useActionData } from 'react-router-dom'

const Subcription = () => {
  const [isleft, setIsleft] = useState("0")
  const [lefty,setLefty] = useState("0")
  return (
    <>
    <div className='pt-[120px]'></div>
    <div className='flex items-center flex-col my-10 relative'>
    <div className='w-[50%] h-16 ac-bg rounded-full relative shadow-md'>
      <span className='w-[50%] absolute left-0 top-0 h-[100%] rounded-full flex justify-center items-center z-20 cursor-pointer luxuria font-bold' onClick={()=>{
        setIsleft("0")
        setLefty("0")
      }}>Monthly</span>
      <span className='w-[50%] absolute right-0 top-0 h-[100%] rounded-full flex justify-center items-center z-20 cursor-pointer luxuria font-bold' onClick={()=> {
        setIsleft("50%")
        setLefty("-110%")
        }}>Yearly</span>
      <span className='absolute bg-light top-0 w-[50%] h-[100%] rounded-full transition-all z-10' style={{
        left: isleft
      }}></span>
    </div>
  
    <div className="sec my-10 flex justify-between transition-all  items-center max-[1050px]:pr-7" >
        {
          lefty == "0" ? (
            <>
            <div className="section grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 m-auto justify-around items-center">
            <Pricing data={"200"}  />
              <Pricing data={"600"} />
              <Pricing data={"1200"} />
        </div>

</>
          ):(
            <>     
              <div className="section grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 m-auto justify-around ">
            <Pricing data={"200"}  />
              <Pricing data={"600"} />
              <Pricing data={"1200"} />
              </div>
            </>
          )
        }
      </div>

    </div>

    </>
  )
}

export default Subcription