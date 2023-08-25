import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import img1 from '../images/image-pizza.jpg'
import img2 from '../images/image-burger.jpg'
import img3 from '../images/image-rice.jpg'

export default function Home() {

    const [search, setsearch] = useState('')
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        setFoodItem(response[0])
        setFoodCat(response[1])
        // console.log(response[0] , response[1])

    }

    useEffect(() => {
        loadData()
    }, [])

    const bgExternal = '#93B1A6'
    const bgInternal = '#5C8374'
    const bgHeading = '#183D3D'
    const bgCard = '#040D12'

    return (
        <div style={{ backgroundColor: bgExternal }}>
            <Navbar />



            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-successs" type="submit">Search</button> */}
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={img2} style={{ filter: 'brightness(30%)s' }} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={img1} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={img3} alt="Third slide" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row m-5 p-4 ' style={{
                                    backgroundColor: bgInternal,
                                    border: '2px solid',
                                    borderColor: bgCard,
                                    borderTopLeftRadius: '30px',
                                    borderBottomRightRadius: '30px',
                                }}>

                                    <div key={data._id} className="fs-3" >
                                        <span className='rounded rouned-pill px-3 py-1 border border-success' style={{ backgroundColor: bgHeading}}> {data.CategoryName}  </span> 
                                    </div>

                                    <hr />

                                    {
                                        foodItem !== []
                                            ?

                                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodItem={filterItems}
                                                                options={filterItems.options[0]}
                                                            />
                                                        </div>
                                                    )
                                                })

                                            : <div>No such data found</div>
                                    }
                                </div>
                            )
                        })
                        : <div>Showing nothing before rendering</div>
                }
            </div>
            {/* {Array.from(Array(60), (e, i) => {
                return (
                    <Card />
                    // <option key={i + 1} value={i + 1}>{i </option>
                )
            })} */}
            <Footer />
        </div>
    )
}
