    import React, { useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'


    export default function Signup() {
        let navigate = useNavigate()
        const [credential, setcredential] = useState({ name: "", email: "", password: "", geolocation: "" })
        async function handleSubmit(e) {
            e.preventDefault();
            console.log(JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation }))

            const response = await fetch("http://localhost:5000/api/createUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation })
                // console.log(body)
            });

            // console.log("response :  => " , response)
            const tempjson = await response.json()
            // console.log( "tempjson : " , tempjson)

            if (!tempjson.success) {
                const error = tempjson.error                
                if(error){
                    alert(error)
                }
                else
                alert(`Enter valid credentials`)
            }

            //go to home page
            else if (tempjson.success) {
                localStorage.setItem("userEmail", credential.email);
                localStorage.setItem("authToken", tempjson.authToken);
                console.log(localStorage.getItem("userEmail"))            
                console.log(localStorage.getItem("authToken"))
                navigate('/')
            }
        }
        const onchange = (event) => {
            setcredential({ ...credential, [event.target.name]: event.target.value })
        }
        return (
            <>

                <div className='d-flex flex-column align-items-center justify-content-center' style={{
                    backgroundImage: "URL('https://img.freepik.com/free-photo/vegetables-set-left-black-slate_1220-685.jpg?w=1380&t=st=1691755107~exp=1691755707~hmac=e411c48d7ecc091af03cec6a119f91c09664ff101a66d9998924beda0318fa35')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh'
                }}>


                    <div className='w-50'>
                        <h1 className='text-decoration-underline text-center'>Registration</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control bg-transparent border border-white text-white" placeholder="Enter name" name='name' value={credential.name} onChange={onchange} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control bg-transparent border border-white text-white" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credential.email} onChange={onchange} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control bg-transparent border border-white text-white" id="exampleInputPassword1" placeholder="Password" name='password' value={credential.password} onChange={onchange} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputPassword1">Address</label>
                                <input type="text" className="form-control bg-transparent border border-white text-white" id="exampleInputPassword1" placeholder="Address" name='geolocation' value={credential.geolocation} onChange={onchange} />
                            </div>

                            <button type="submit" className="btn btn-success m-3 rounded-pill" style={{
                                width: '20%'
                            }}>Sign Up</button>

                            <hr />

                            <div className="text-center">
                                <Link to="/login" className='btn btn-outline-danger center-block'>Already a user</Link>
                            </div>

                        </form>
                    </div >
                </div >
            </>
        )
    }
