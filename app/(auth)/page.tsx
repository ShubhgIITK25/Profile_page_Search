import React from 'react'
import Link from "next/link"

const Home = () => {
  return (
    <div>
      <h1>This is the home page of my project</h1> 
      <Link  href="/login">Login</Link>
    </div>
  )
}
export default Home
