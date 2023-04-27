import React, { useState } from 'react'
import signinpic from '../Images/signup.svg'

import { NavLink, useNavigate } from 'react-router-dom'


const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
    address:''
  });

  let name, value;
  const handleInputs = (e) => {

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }


  const PostData = async (event) => {
    event.preventDefault();

    const { name, email, phone, work, password, cpassword,address } = user;
    // console.log("before")

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword,address
      })
    })

    // console.log("after")


    const data = response.json();
    // console.log(data, " signup");


    if (data.status === 422 || !data) {
      console.log("invalid");
      window.alert("Invalid Registration")

    } else {
      console.log("success");
      window.alert("Successful Registration")
      // console.log(data);
      navigate('/login')

    }
    // console.log("hiii");

  }


  return (
    <>
      <section className='signup'>
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Signup</h2>
              <form method='POST' className='register-form' id='register-form'>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className="zmdi zmdi-accounts material-icons-name"></i>
                  </label>
                  <input type='text' name='name' id='name'
                    onChange={handleInputs}
                    value={user.name}
                    autoComplete='off' placeholder='Your Name' />
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type='email' name='email' id='email'
                    onChange={handleInputs}
                    value={user.email}
                    autoComplete='off' placeholder='Your Email' />
                </div>

                <div className='form-group'>
                  <label htmlFor='phone'>
                    <i className="zmdi zmdi-phone material-icons-phone"></i>
                  </label>
                  <input type='number' name='phone' id='phone'
                    onChange={handleInputs}
                    value={user.phone}
                    autoComplete='off' placeholder='Your Phone' />
                </div>

                <div className='form-group'>
                  <label htmlFor='work'>
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input type='text' name='work' id='work'
                    onChange={handleInputs}
                    value={user.work}
                    autoComplete='off' placeholder='Your Profession' />
                </div>

                <div className='form-group'>
                  <label htmlFor='address'>
                  <i class="zmdi zmdi-pin"></i>
                  </label>
                  <input type='text' name='address' id='work'
                    onChange={handleInputs}
                    value={user.address}
                    autoComplete='off' placeholder='Your Address' />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type='password' name='password' id='password'
                    onChange={handleInputs}
                    value={user.password}
                    autoComplete='off' placeholder='Your Password' />
                </div>

                <div className='form-group'>
                  <label htmlFor='cpassword'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type='password' name='cpassword' id='cpassword'
                    onChange={handleInputs}
                    value={user.cpassword}
                    autoComplete='off' placeholder='Confirm Your Password' />
                </div>

                <div className='form-group form-button'>
                  <input type='submit' name='signup' id='signup' className='form-submit' value='register' onClick={PostData} />
                </div>

              </form>
            </div>
            <div className='signup-image'>
              <figure>
                <img src={signinpic} alt='signinpic' />
              </figure>
              <NavLink to='/login' className='signup-image-link'>Already Registerd</NavLink>
            </div>
            {/* {process.env.REACT_APP_BASE_URL} */}

          </div>
        </div>
      </section>

    </>
  )
}

export default Signup
