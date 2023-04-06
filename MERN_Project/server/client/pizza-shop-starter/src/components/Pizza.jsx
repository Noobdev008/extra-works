import React from 'react'
import { Card, Button, Row, Col, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../actions/cartAction'

const Pizza = ({ pizza }) => {

    const [varient, setVarient] = useState("small")
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart(pizza,quantity,varient))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"
                    src={pizza.image}
                    style={{ height: "240px", cursor: "pointer" }}
                    onClick={handleShow}
                />
                <Card.Body>
                    <Card.Title>{pizza.name}</Card.Title>
                    <hr></hr>
                    <Card.Text>
                        <Row>
                            <Col md={6}>
                                <h6>Varients</h6>
                                <select value={varient} onChange={e => setVarient(e.target.value)}>
                                    {
                                        pizza.varients.map(varients => (
                                            <option >{varients}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col md={6}>
                                <h6>Quantity</h6>
                                <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                                    {
                                        [...Array(15).keys()].map((num, i) => (
                                            <option value={i + 1} >{i + 1} </option>
                                        ))
                                    }
                                </select>
                            </Col>
                        </Row>
                    </Card.Text>

                    <Row>
                        <Col md={6}>
                            Price:{pizza.prices[0][varient] * quantity} INR
                        </Col>
                        <Col md={6}>
                            <Button onClick={addToCartHandler} style={{ marginTop: "10px" }} className='bg-blue text-white'>Add To Cart</Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <br></br>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Img variant="top"
                        src={pizza.image}
                        style={{ height: "240px", cursor: "pointer" }}
                        onClick={handleShow}
                    />
                    <h3>Description:</h3>
                    {pizza.description}
                </Modal.Body>
            </Modal>

        </>
    )
}

export default Pizza
