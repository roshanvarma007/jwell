import React from 'react'
import { FaStar } from 'react-icons/fa6'

const ApproveReview = () => {
  return (
    <>
    <div className='max-md:pt-[120px]'></div>
    <h1 className='text-center luxuria font-bold text-3xl my-10'><i>Approve Review</i></h1>
    <div className='grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-10'>
    <div className=' h-[400px] rounded-md mx-5 mb-10 flex flex-col bg-light shadow-xl'>
            <div className='px-5 my-5 flex gap-3 relative'>
                <span className='w-[50px] h-[50px] bg-sky-400 rounded-[50%]'></span>
                <span className='absolute bottom-0 left-20 poppins font-semibold'>
                    Saif khan
                    <br />
                    <span className='text-gray-400 font-normal text-sm'>Provider</span>
                </span>
            </div>

            <div className='flex mx-5 gap-4 text-orange-500'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>

            <div className='px-5 luxuria font-medium italic my-7'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, facere? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, tempore?
            </div>


        </div>
        <div className=' h-[400px] rounded-md mx-5 mb-10 flex flex-col bg-light shadow-xl'>
            <div className='px-5 my-5 flex gap-3 relative'>
                <span className='w-[50px] h-[50px] bg-sky-400 rounded-[50%]'></span>
                <span className='absolute bottom-0 left-20 poppins font-semibold'>
                    Saif khan
                    <br />
                    <span className='text-gray-400 font-normal text-sm'>Provider</span>
                </span>
            </div>

            <div className='flex mx-5 gap-4 text-orange-500'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>

            <div className='px-5 luxuria font-medium italic my-7'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, facere? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, tempore?
            </div>


        </div>
        <div className=' h-[400px] rounded-md mx-5 mb-10 flex flex-col bg-light shadow-xl'>
            <div className='px-5 my-5 flex gap-3 relative'>
                <span className='w-[50px] h-[50px] bg-sky-400 rounded-[50%]'></span>
                <span className='absolute bottom-0 left-20 poppins font-semibold'>
                    Saif khan
                    <br />
                    <span className='text-gray-400 font-normal text-sm'>Provider</span>
                </span>
            </div>

            <div className='flex mx-5 gap-4 text-orange-500'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>

            <div className='px-5 luxuria font-medium italic my-7'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, facere? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, tempore?
            </div>


        </div>
    </div>

    </>
  )
}

export default ApproveReview