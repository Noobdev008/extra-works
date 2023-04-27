import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
    let token_ = localStorage.getItem("token")
    // promisses 

    const { state, dispatch } = useContext(UserContext);

    // Promises
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/logout?` + (new URLSearchParams({ token_ })).toString(), {    
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then((res) => {
            dispatch({ type: "USER", payload: false });
            localStorage.removeItem('token');
            navigate('/login');
            if (res.status != 200) {
                throw new Error
            }
        }).catch((err) => {
            console.log(err);
        })
    })



}

export default Logout
