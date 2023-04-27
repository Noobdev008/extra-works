import React, { useEffect, useState } from 'react'
import phone_ from '../Images/phone.png'
import email_ from '../Images/email.png'
import address_ from '../Images/address.png'
import { useNavigate } from 'react-router-dom'
const Contact = () => {


  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  let token_ = localStorage.getItem("token");
  const navigate = useNavigate()

  const callContactPage = async () => {
    try {
      const res = await fetch(`http://localhost:5000/getdata?` + (new URLSearchParams({ token_ })).toString()
      );

      const data = await res.json();
      console.log(data, " data conatc");
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone, address: data.address })

      if (res.status !== 200) {
        // console.log(data, " resdata")
        navigate('/login')
      }
    } catch (error) {
      // console.log( data, " erorr data");
      console.log(error);
      navigate('/login');
    }
  }


  useEffect(() => {
    callContactPage();
  }, [])


  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({ ...userData, [name]: value })
  }


  // send data backend

  const sendMessage = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/contact?` + (new URLSearchParams({ token_ })).toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone, message
      })
    })
    const data = await res.json();
    console.log(res);

    if (!data || !data.message) {
      alert('message not send')
    } else {
      alert('message sent')
      setUserData({ ...userData, message: '' })
    }

  }
  return (
    <>
      <div className='contact_info'>
        <div className='container-fuild'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
              <div className='contact_info_item d-flex justify-content-start align-items-center' >
                <img src={phone_} alt="phone" />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Phone
                  </div>
                  <div className='contact_info_text'>
                    {userData.phone}
                  </div>
                </div>
              </div>
              <div className='contact_info_item d-flex justify-content-start align-items-center' >
                <img src={email_} alt="email" />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Email
                  </div>
                  <div className='contact_info_text'>
                    {userData.email}
                  </div>
                </div>
              </div>
              <div className='contact_info_item d-flex justify-content-start align-items-center' >
                <img src={address_} alt="address" />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Address
                  </div>
                  <div className='contact_info_text'>
                    {userData.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className='contact-form'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-10 offset-lg-1'>
                <div className='contact_form_container py-5'>
                  <div className='contact_form_title'>Get in Touch</div>
                  <form id='contact_form' method='POST'>
                    <div className='contact_form_name d-flex justify-content-between align-items-between'>
                      <input type='text' id='contact_form_name' className='contact_form_name input_field' onChange={handleInput} name='name' value={userData.name} placeholder='your name' required={true} />
                      <input type='email' id='contact_form_email' className='contact_form_email input_field' onChange={handleInput} name='email' value={userData.email} placeholder='your email' required={true} />
                      <input type='number' id='contact_form_phone' className='contact_form_phone input_field' onChange={handleInput} name='phone' value={userData.phone} placeholder='your number' required={true} />
                    </div>
                    <div className='contact_form_text mt-5' >
                      <textarea className='text_field contact_form_message' placeholder='Message' cols="30" rows="10" onChange={handleInput} name='message' value={userData.message}></textarea>
                    </div>
                    <div className='contact_form_button'>
                      <button type='submit' className='button contact_submit_button' onClick={sendMessage}>Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contact
