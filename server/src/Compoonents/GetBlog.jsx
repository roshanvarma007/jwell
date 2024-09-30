import React, { useEffect, useState } from 'react'
import api from './Api'
import { useParams } from 'react-router-dom'

const GetBlog = () => {
    const [blog,setBlog] = useState()

    const {id} = useParams()

    console.log({id})

    useEffect(()=>{
        api.get(`/get-blog/${id}`).then((res)=>{
            console.log(res.data.blog)
            setBlog(res.data.blog)
        })
    },[])
  return (
    <>
    <div className='pt-[140px]'></div>
    <h1 className='text-2xl text-center font-bold'>
      {blog?.title}
    </h1>
    <pre
    className='poppins' 
    dangerouslySetInnerHTML={{__html: blog?.thought}}
    />
    </>
  )
}

export default GetBlog