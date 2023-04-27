import React, { useEffect, useState } from 'react'

function Home() {

  const [userData, setUserData] = useState('');
  const [show, setShow] = useState(false)
  let token_ = localStorage.getItem("token");
  // const navigate = useNavigate()

  const callHomePage = async () => {
    try {
      const res = await fetch(`http://localhost:5000/getdata?` + (new URLSearchParams({ token_ })).toString()
      );

      const data = await res.json();
      console.log(data.name, " data home");
      setUserData(data.name)
      setShow(true)

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    callHomePage();
  }, [])





  return (
    <>
      <div className='home-page'>
        <div className='home-div'>
          <p className='pt-5'>WELCOME</p>
          <h1>{userData}</h1>
          <h1>{userData === undefined ? 'We Are The Mern Developer' : 'Happy,to see you back'}</h1>
        </div>
      </div>
    </>
  )
}

export default Home
