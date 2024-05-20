import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredimage}) {
    
   const [href,setHREF] = useState('')
     
   useEffect(()=>{
    appwriteService.getFilePreview(featuredimage).then(data => setHREF(data))
   },[])
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full   bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={href} alt={title}
                
                className='rounded-xl  h-1/2  ' />

            </div>
            <h2
            className='text-sm md:text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard