import React, { useEffect, useState } from 'react'
import IMAGES from '../images'
import { Link } from 'react-router-dom'
import api from './Api'

const Blog = () => {

    const [blog,setBlog] = useState()

    useEffect(()=>{
        api.get("/all-blog").then((res)=>{
            console.log(res.data.blog)
            setBlog(res.data.blog)
        })
    },[])

  return (
   <>
   <div className="pt-[120px]"></div>
   <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-3'>

    {
        blog?.map((el,index)=>{
   return <div className='bg-light mx-3 rounded-lg py-3 my-5'>
        <div className='pl-3'>
            <h1 className='my-2 luxuria font-bold'>{el?.title}</h1>
            <pre
    className='poppins w-full h-[150px] overflow-hidden' 
    dangerouslySetInnerHTML={{__html: el?.thought}}
    />
            <Link to={`/getblog/${el?._id}`} className='poppins underline font-light my-3'>Read more</Link>
        </div>
    </div>
        })
    }

   </div>
   </>
  )
}

export default Blog