import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart()
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();
    const bgcolor = '#040D12'
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty })
            }
            else
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log(data)
    }
    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className="card mt-3" style={{ width: '18rem', 'maxHeight': '360px' }} >
            <img className="card-img-top" src={props.foodItem.img} alt="This is a card" style={{ height: "150px", objectFit: "fill" }} />
            <div className="card-body"
                style={{ backgroundColor: bgcolor }}
            >
                <h5 className="card-title">{props.foodItem.name}</h5>
                {/* <p className="card-text">This is some important text.</p> */}
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return <option value={data} key={data} >{data}</option>
                        })}
                        {/* <option value="half">Half</option>
                                <option value="full">Full</option> */}
                    </select>


                    <div className='d-inline h-100 fs-5'>
                        Rs. {finalPrice}
                    </div>
                </div>

                <hr>
                </hr>
                <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}
