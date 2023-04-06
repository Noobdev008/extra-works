import '@/styles/globals.css'
import Link from "next/link"

export default function App({ Component, pageProps }) {
  return <>
  <Navigation/>
    <Component {...pageProps} />
  </>
}


const Navigation = () => {
  return (
    <>
  
      <Link href='/'>Home   </Link>
      <Link href='/about'>About </Link>
      <Link href="/courses">Course</Link>
    </>
  )
}