import React from 'react'
import { useAuth } from '../../store/auth';
import { Button } from '@material-tailwind/react';
import { FaDownload } from 'react-icons/fa6';

const History = () => {

    const {user} = useAuth()

    const downloadImage = async (imageUrl, index) => {
        console.log(imageUrl)
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jeweallity${index}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Clean up after the download
      };

  return (
    <>
    <div className='pt-[150px]'></div>
    <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full m-auto'>
      {
        user?.userData?.history.map((el, index) => {
          return(<>
          <div className='m-3 px-4  rounded-xl imagcont relative' key={index}>
          <img id='testImg' className='w-full h-full rounded-xl'  src={el?.imgurl} key={el?.imgurl} alt="img" />
          <Button className="ac-bg hover:bg-[#5a7a45] text-white py-2 px-4 rounded-lg relative top-[-100%] mt-1 mr-1 right-[-5px]" key={`${el?.imgurl}-${index}`} onClick={(e)=>downloadImage(el?.imgurl, index)}><FaDownload /></Button>
          </div>
          </>)
        })
      }
      </div>

    </>
  )
}

export default History