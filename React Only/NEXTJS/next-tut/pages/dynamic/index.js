import Link from 'next/link'
import React from 'react'

const Dynamic = ({ data }) => {
  //console.log(data); // client log ///  after rendering
  return (
    <>
      <h1>Blog post Dynamic</h1>
      <ul>
        {
          data.map(
            (x, i) => {
              
              return <li key={i}>{x.id} <Link href={`dynamic/id/${x.id}`}>{x.title}</Link></li>
            }
          )
        }

      </ul>
    </>
  )
}

export default Dynamic



export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()
  // console.log(data); // server log  // pre rendering
  return {
    props: {
      data: data.slice(0, 20)
    }
  }
}
