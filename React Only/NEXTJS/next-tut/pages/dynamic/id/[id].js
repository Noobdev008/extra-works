import React from 'react'

const ID = ({ data }) => {
    // console.log(data);
    return (
        <>
            <div>{data.title}</div>
            <div>{data.body}</div>
        </>
    )
}

export default ID


export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    const paths = posts.map((x, i) => {
        return {
            params: {
                id: x.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context
    // console.log(params);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const data = await res.json()
    console.log(data);
    return ({
        props: {
            data
        }
    })
}
