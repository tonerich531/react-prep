import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const Post = () => {
    const { id } = useParams()
    const [posts, setPosts] = useState({})

    useEffect(() => {
        async function fetchData() {
        await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        }
        fetchData();

    }, []);
    return (    
    <div>
        {posts.map(post => <div>{post.id}</div>)} 
    </div>
  )
}

export default Post
