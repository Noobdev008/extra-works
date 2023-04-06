import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HiMinusCircle, HiTrash } from 'react-icons/hi'
import { AiFillPlusCircle } from 'react-icons/ai'
import { addToCart, deleteFromCart } from '../actions/cartAction'
import Checkout from '../components/Checkout';
const CartScreen = () => {
    const cartState = useSelector(state => state.cartReducer);
    const cartItems = cartState.cartItems;
    const dispatch = useDispatch();
    const subTotal = cartItems.reduce((sum, item) => sum + item.price, 0)
    return (

        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>My Cart Items</h1>
                        <hr />
                        <Row>
                            {
                                cartItems.map(items => (
                                    <>
                                        <Col md={7}>
                                            <h4>{items.name} [{items.varient}]</h4>
                                            <h6>Price: {items.quantity} X {items.prices[0][items.varient]}={" "}{items.price}</h6>
                                            <h6>Quantity :
                                                <HiMinusCircle className='text-danger' style={{ cursor: "pointer" }} onClick={() => { dispatch(addToCart(items, items.quantity - 1, items.varient)) }} /> &nbsp;
                                                {items.quantity} &nbsp;
                                                <AiFillPlusCircle className='text-success' style={{ cursor: "pointer" }} onClick={() => { dispatch(addToCart(items, items.quantity + 1, items.varient)) }} /> &nbsp;
                                                <HiTrash className='text-danger' style={{ cursor: "pointer", marginLeft: "0px" }} onClick={() => { dispatch(deleteFromCart(items)) }} />
                                            </h6>

                                        </Col>
                                        <Col md={5}>
                                            <img alt={items.name} src={items.image} style={{ width: "100px", height: "80px", padding: "2px" }}></img>
                                        </Col>
                                        <hr />

                                    </>

                                ))
                            }
                        </Row>
                    </Col>
                    <Col md={4}>
                        <h1>
                            Payment Info
                        </h1>
                        <h4>SubTotal</h4>
                        <h4>{subTotal} INR</h4>
                        <Checkout
                            subTotal={subTotal}
                        />
                        <hr />
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default CartScreen
