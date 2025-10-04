import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Post = () => {
    let navigate = useNavigate();
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading]= useState(true)
    const [searchId, setSearchId] = useState('')

    function onSearch() {
        fetchData(searchId)
    }

    async function fetchData(userId) {
    const { data }= await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`)
    console.log(data)
    setPosts(data)
    setLoading(false)
    }
    useEffect(() => {
        fetchData();
    }, [id]);
    return (    
<>
  <div className="post__search">    
    <button onClick= {() => navigate('/')}>← Back</button>    
    <div className="post__search--container">
      <label className="post__search--label">Search by Id</label>
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                onSearch()
            }}}
    />      
      <button onClick={() => onSearch()}>Enter</button>
    </div>
  </div>    
    {
    loading ? 
        new Array(10).fill(0).map((element, index) => (
        <div className="post" key={index}>
            <div className="post__title">
            <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
            <p className="post__body--skeleton"></p>
            </div>
        </div>)
        )
        : (
            posts.map((post) => (
            <div className="post" key= {post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
            </div>
            ))
        )}  
</>
  )
}

export default Post
