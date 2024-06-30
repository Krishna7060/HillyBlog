import React, {useEffect, useState} from 'react'
import {PostForm,Postcard} from '../components'

import appwriteService from "../appwrite/config"
import { useNavigate,  useParams } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard{...post} />
                        </div>
                    ))}
                </div>
            
        </div>
    )
}

export default Home