import React, { useEffect } from 'react'
import { useGlobalContext } from './context'
const Stories = () => {

  const { hits, isLoading, removePost } = useGlobalContext()

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  return (
    <>
      <div className='stories-div'>
        <h1>{hits.map((curPost) => {
          const { title, author, objectID, url, num_comments } = curPost
          return (

            <div className='card' key={objectID}>
              <h2>{title}</h2>
              <p>
                By <span>{author}</span> | <span>{num_comments}</span> commnets
              </p>
              <div className='card-button'>
                <a href={url} target="_blank">Read More</a>
                <a href='#' onClick={() => removePost(objectID)}>Remove</a>
              </div>


            </div>

          )
        })}</h1>
      </div>
    </>
  )
}

export default Stories
