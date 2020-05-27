import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'
import {Link, useParams, useHistory} from 'react-router-dom'

const UpdatePost = () => {
  const history = useHistory()
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const {state, dispatch} = useContext(UserContext)
  const {postId} = useParams()

  useEffect(() => {
    fetch(`/posts/${postId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "Content-Type" : "application/json"
      }
    }).then(res => res.json())
    .then(result => {
      setPost(result)
      setTitle(result.title)
      setBody(result.body)
    })
  }, [])

   const updateData = () => {
     fetch('/posts/updatepost', {
       method: "put",
       headers: {
         "Authorization": "Bearer " + localStorage.getItem("jwt"),
         "Content-Type" : "application/json"
       },
       body: JSON.stringify({
         postId: postId,
         title: title,
         body: body
       })
     }).then(res => res.json())
     .then(result =>  {
       M.toast({html: "Post updated Successfully", classes: "#43a047 green darken-1"})
       history.push('/')

     }).catch(err => console.log(err))
   }

  return (
    <>
    {
      post ?


        post.postedBy._id.toString() === state._id ?

        <div className = "card home-card">
          <h5 style={{padding: "5px"}}><Link to = {post.postedBy._id == state._id ? "/profile" : "/profile/"+post.postedBy._id} >
           <img src = {post.postedBy.pic} style = {{width: "30px", height: "30px", borderRadius: "50%"}} /> {post.postedBy.name}</Link> </h5>
          <div className = "card-image">
            <img src = {post.photo} />
          </div>
          <div className = "card-content">
            <h6>{post.likes.length} likes  {post.comments.length} comments</h6><br />
            <label style={{fontSize: "17px"}}> Title: </label>
            <input type = "text" value = {title} onChange = {(e) => setTitle(e.target.value)} autoFocus />
            <label style={{fontSize: "17px"}}> Body: </label>
            <input type = "text" value = {body} onChange = {(e) => setBody(e.target.value)} />
            <button className = "btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => updateData()}> Update Post </button>
            <button style={{marginLeft: "20px"}} className = "btn waves-effect waves-light #d32f2f red darken-2" onClick={() => history.push('/')}> Cancel </button>
          </div>
        </div>
        :
        history.push('/')

      :
      <div class="progress">
      <div class="indeterminate"></div>
      </div>
    }
    </>
  )
}

export default UpdatePost