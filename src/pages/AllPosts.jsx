import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import AppwriteService from '../appwrite/config'
function AllPosts() {
    const [postsArray, setPostsArray] = useState([])

    useEffect(()=>{ AppwriteService.getAllPosts([]).then(posts =>{
        if(posts){
            setPostsArray(posts.documents)
           
             
        }
        
    })},[])
    
    
   
  return (
    <div className='w-full py-8'>
    <Container>
         <div className='flex flex-wrap'>
        
            {postsArray.map(post=>{
         return ( <div key={post.$id} className='p-2 w-full'>
                 
                    <PostCard {...post}/>
                </div>)
            })}
         </div>
    </Container>
      
    </div>
  )
}

export default AllPosts
