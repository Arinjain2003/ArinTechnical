import React, { useState } from 'react'
import './Register.css'
import {useNavigate} from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


const Register = () => {

  const[user,setUser] =  useState({
    username:"",
    email:"",
    phone:"",
    password:""     
  });

  const {storeTokenInLS} = useAuth();

  const navigate = useNavigate();

  const handleInput =(e) =>{
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value
    })
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(user);
     
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
       console.log("response from server: " ,responseData.message);

      if (response.ok) {
       
        // storing token in localHost
        storeTokenInLS(responseData.token);
        // localStorage.setItem("token",responseData.token);

        toast.success("registration successful");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate('/')
      } else {
       toast.error(responseData.extraDetails ? responseData.extraDetails: responseData.message );
      }
    } catch (error) {
      console.error("Error", error);
    }
  
  }

  return (
      <>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
              
                <div className="registration-image">
                    <img src = "/images/register.png" alt="a girl is trying to register" width="500" height="500"/>
                </div>
                 
                <div className="registration-form">
                <h1 className="main-heading mb-3">Registration form</h1>
                <br />
                <form  onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                      autoComplete='off'
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="0000-000000"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>

              </div>
            </div>
          </main>
        </section>
      </>
  )
}

export default Register