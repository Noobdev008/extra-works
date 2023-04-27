import React, { useContext, useState } from 'react'
import loginpic from '../Images/login.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


const Login = () => {

  const { state, dispatch } = useContext(UserContext);


  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const {email,password} = 

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password
      })
    })
    console.log(response.token, " res");
    const data = await response.json();

    localStorage.setItem("token", data.token)

    let min = new Date().getMinutes() + 1
    let expire = new Date().setMinutes(min)

    console.log(new Date(expire), " , ", expire);
    document.cookie = `token=${data.token}; expires=${new Date(expire)}`

    // console.log(data.token, " data login");

    if (data.message === "user error" || data.error == "Invalid data" || !data) {
      window.alert("Invalid Credintial")
    } else {
      dispatch({ type: 'USER', payload: true })
      window.alert("Login Sucessful");
      navigate('/');
    }
  }



  return (
    <>
      <section className='signin'>
        <div className='container mt-5'>
          <div className='signin-content'>
            <div className='signin-image'>
              <figure>
                <img src={loginpic} alt='signinpic' />
              </figure>
              <NavLink to='/signup' className='signin-image-link'>Create An Account</NavLink>
            </div>

            <div className='signin-form'>
              <h2 className='form-title'>signin</h2>
              <form className='register-form' id='register-form' method='POST'>

                <div className='form-group'>
                  <label htmlFor='email'>
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type='email' name='email' id='email' autoComplete='off' placeholder='Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type='password' name='password' id='password' autoComplete='off' placeholder='Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='form-group form-button'>
                  <input type='submit' name='signin' id='signin' className='form-submit' value='Log In' onClick={loginUser} />
                </div>

              </form>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default Login
