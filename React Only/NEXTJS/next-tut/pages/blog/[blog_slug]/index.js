import React from 'react'
import {useRouter} from 'next/router'

const BlogSlug = () => {
  const route = useRouter()
  const slug = route.query.blog_slug
  return (
    <div>
      This is the {slug}
    </div>
  )
}

export default BlogSlug
