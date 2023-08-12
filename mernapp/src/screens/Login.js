import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

export default function Login() {
    
    const [credential, setcredential] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify({ email: credential.email, password: credential.password }))

        const response = await fetch("http://localhost:5000/api/loginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
            // console.log(body)
        });

        const tempjson = await response.json()
        console.log(tempjson)

        if (!tempjson.success) {
            alert(`Enter valid credentials`)
        }
        if (tempjson.success) {
            localStorage.setItem("userEmail", credential.email);
            localStorage.setItem("authToken", tempjson.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate('/')
        }



    }
    const onchange = (event) => {
        setcredential({ ...credential, [event.target.name]: event.target.value })
    }


      const imgurl = 'https://img.freepik.com/free-photo/vegetables-set-left-black-slate_1220-685.jpg?w=1380&t=st=1691755107~exp=1691755707~hmac=e411c48d7ecc091af03cec6a119f91c09664ff101a66d9998924beda0318fa35'
    return (

        <>

            <div className='d-flex flex-column align-items-center justify-content-center' style={{
                backgroundImage: `url(${imgurl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }}>


{/* <ReactPlayer
      className='background-video'
        url={backgroundVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
      /> */}


    

                <div>
                    <h1>Welcome to GoFood...</h1>
                    
                    <form onSubmit={handleSubmit}>

                        <div className="form-group my-4">
                            <label htmlFor="exampleInputEmail1">Your email</label>
                            <input type="email" className="form-control bg-transparent border border-white text-white" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="e.g. user@gofood.com" name='email' value={credential.email} onChange={onchange} />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="exampleInputPassword1">Your password</label>
                            <input type="password" className="form-control bg-transparent border border-white text-white" id="exampleInputPassword1" placeholder="e.g. gofood123" name='password' value={credential.password} onChange={onchange} />
                        </div>

                        <button type="submit" className="btn btn-success m-3 rounded-pill" style={{
                            width: '90%'
                        }}>Log In</button>
                        <hr />
                        <Link to="/createUser" className='btn btn-outline-danger center-block'>Don't have an account?</Link>
                    </form>

                </div>
            </div >
        </>
    )
}
