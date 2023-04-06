import { useEffect, useState } from 'react'

import './App.css'
import axios from './axios'  // alias name we can use like shubham and whaterever you want

const API = "https://jsonplaceholder.typicode.com/posts"

function App() {
  const [myData, setmyData] = useState([])
  const [error, setError] = useState("")
 
  //  using promises
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => {
  //       setmyData(res.data)
  //     })
  //     .catch((err) => {
  //       setError(err.message)
  //     })
  // }, [])


  //  using async await 

  const callingApi = async () => {
    try {
      const res = await axios.get("/posts")
      setmyData(res.data)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    callingApi()
  })

  return (
    <>
      <h1>Axios Tut</h1>
    <br />
      {error !== "" && <h2 className='error'>{error}</h2>}
      <div className='grid'>
        {myData.slice(0,12).map((post) => {
          const { id, body, title } = post
          return (
            <div className='card' key={id}>
              <h2>{title.slice(0, 15).toUpperCase()}</h2>
              <p>{body.slice(0, 100)}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
