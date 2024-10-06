import React, { useEffect, useState } from 'react'
import api from './Api';

const Review = () => {
    const [filter, setFilter] = useState()

    useEffect(() => {
        api.get("/get-review").then((res) => {
            console.log(res.data)

           setFilter(res.data.filter((el) => el?.approve == true))

            console.log(filter)
        })
    }, [])
    
  return (
    <>
    <h1 className='text-center luxuria font-bold text-3xl my-10'><i>Ours Reviews</i></h1>
    <div className='grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-10'>
    {
                    filter?.map((el, index)=>{
        return <div key={index} className=' h-[400px] rounded-md mx-5 mb-10 flex flex-col bg-light shadow-xl relative'>
                    <div className='flex flex-col my-4 mx-3 text-center'>
                        <p className='poppins font-bold'>{el?.name}</p>
                        <p className='poppins font-bold'>{el?.email}</p>
                    </div>

                    <div>
                        <p className='poppins font-semibold text-center'>{el?.rates}.7 stars Review</p>
                    </div>

                    <div className='px-5 luxuria font-medium italic my-7'>
                       {el?.message}
                    </div>
                </div>
                    })
                }
    </div>

    <button className='w-[30%] py-3 my-6 rounded-md flex justify-center poppins font-semibold ac-bg mx-auto text-white hover:bg-[#284e1f] transition-all'><i>See all</i></button>
    </>
  )
}

export default Review