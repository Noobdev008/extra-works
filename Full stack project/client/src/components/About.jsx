import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import shubhampic from '../Images/shubhampic.jpg'
import aboutpic from '../Images/aboutpic.png'



const About = () => {

  let token_ = localStorage.getItem("token")



  const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const callAboutPage = async () => {
    try {


      const res = await fetch(`http://localhost:5000/about?` + (new URLSearchParams({ token_ })).toString()

        // {
        //   // method: 'GET',
        //   // headers: {
        //   //   Accept: "application/json",
        //   //   "Content-Type": "application/json",
        //   //   "Access-Control-Allow-Credentials": true,
        //   //   "Access-Control-Allow-Headers": "X-Requested-With,content-type",
        //   //   "Access-Control-Allow-Methods": ["GET", "POST", "PUT", "PATCH", "DELETE"],
        //   //   "Access-Control-Allow-Origin": "*",
        //   //   token: 'shubham sriavsatav'
        //   // },
        //   // credentials: "include",
        //   // params: {
        //   //   token: "shubham sriavatasva"
        //   // }
        //   // mode: "cors", // no-cors, *cors, same-origin
        //   // // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //   // credentials: "same-origin", // include, *same-origin, omit
        //   params: {
        //     // "Content-Type": "application/json",
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //     "token": "Shubham Srivastava"
        //   },
        // }
      );

      const data = await res.json();
      console.log(data, " data about");
      setUserData(data)

      if (res.status !== 200) {
        // console.log(data, " resdata")
        navigate('/login')
      }
    } catch (error) {

      console.log(res, data, " erorr data");
      navigate('/login');
    }
  }


  useEffect(() => {
    callAboutPage();
  }, [])

  return (
    <>
      <div className='container emp-profile'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-img'>
                <img src={userData.name === "Shubham Srivastava" ? shubhampic : aboutpic} alt="img" />
              </div>

            </div>
            <div className='col-md-6'>
              <div className='profile-head'>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className='profile-rating mt-3 mb-5'>RANKING: <span>1/10</span></p>

                <ul className='nav nav-tabs' role='tablist'>
                  <li className='nav-itenm'>
                    <a className='nav-link active' id='home-tab' data-toggle='tab' href="#home" role='tab'>About</a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' id='profile-tab' data-toggle='tab' href="#profile" role='tab'>Timeline</a>
                  </li>
                </ul>

              </div>
            </div>

            <div className='col-md-2'>
              <input type="submit" className='profile-edit-btn' value='Edit Profile' name='btnAddMore' />
            </div>

          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-work'>
                <p> WORK LINKS</p>
                <a href='' target='_shubham'>Youtube</a> <br />
                <a href='' target='_shubham'>Youtube</a>  <br />
                <a href='' target='_shubham'>Youtube</a>  <br />
                <a href='' target='_shubham'>Youtube</a>  <br />
                <a href='' target='_shubham'>Youtube</a>  <br />
              </div>
            </div>

            <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id='myTabContent'>
                <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
                  <div className='row'>
                    <div className='col-md-6'>
                      User ID
                    </div>
                    <div className='col-md-6'>
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      Name
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      Email
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      Phone
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      Profession
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.work}</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div className="row">
                <div className="col-md-6">
                  Experience
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  Hourly Rate
                </div>
                <div className="col-md-6">
                  <p>10$/hr</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  Total Projects
                </div>
                <div className="col-md-6">
                  <p>230</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  English Level
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  Availability
                </div>
                <div className="col-md-6">
                  <p>6 months</p>
                </div>
              </div>

            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default About
