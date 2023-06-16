import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function users() {
const [users,setUsers]=useState([])
useEffect(()=>{
  axios.get("http://localhost:8080/admin/users")
  .then (res=>{setUsers(res.data)})
},[])
  return (
    <main
    >
     <h1>All Users</h1>

{users.map((e,i)=><ul key={i}> 
  <li>Name:{e.name}</li>
  <li>Role:{e.role}</li>
  <li>Email:{e.email}</li>
  <li>Created At{e.createdAt}</li>
  <li><button>Delete</button></li>
  <li><button>Add as Admin</button></li>
</ul>)}
    </main>
  )
}
