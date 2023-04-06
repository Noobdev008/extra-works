import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Blog = () => {
  const router = useRouter()

  const click = () => {
    router.push('/')
  }

  return (
    <>
      <Link href="blog/blog1" replace> Blog1 </Link>
      <Link href="blog/blog2">Blog2 </Link>
      <Link href="blog/blog3">Blog3 </Link>
      <Link href="blog/blog4">Blog4 </Link>
      <Link href="blog/blog5">Blog5 </Link>
      <Link href="blog/blog6">Blog6 </Link>
      <Link href="blog/blog7">Blog7 </Link>
      <Link href="blog/blog8">Blog8 </Link>
      <button onClick={click}> Click me </button>

    </>
  )
}

export default Blog
