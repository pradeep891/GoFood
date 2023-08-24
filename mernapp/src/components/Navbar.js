import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


//with the help of link we go to other url withoutreloading the page
export default function Navbar() {
    const [cartView, setCartView] = useState(false)

    let data = useCart();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    }
    const customBackgroundColor = '#183D3D';
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: customBackgroundColor }}>
                <div className='container-fluid'>
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item mx-2">
                                <Link className="nav-Link text-white" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("authToken") ?
                                <li className="nav-item mx-2">
                                    <Link className="nav-Link text-white" to="/myOrder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>

                        {!localStorage.getItem("authToken") ?

                            <div className='d-flex'>
                                <Link className="button bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="button bg-white text-success mx-1" to="/createUser">Signup</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>My Cart <span class="badge rounded-pill bg-danger">{data.length}</span>

                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)} >   <Cart />    </Modal> : null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
