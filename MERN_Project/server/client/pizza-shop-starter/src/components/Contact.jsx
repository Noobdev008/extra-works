import React from 'react'
import { Container, Row, Col, Table,Image } from 'react-bootstrap'
import {FiPhoneCall} from 'react-icons/fi'
import {FaWhatsapp} from 'react-icons/fa'
import {HiOutlineMailOpen} from 'react-icons/hi'
import Pizza from '../assets/Images/Pizza_Hut.png'
const Contact = () => {
    return (
        <>
            <Container style={{ marinTop: "50px" }}>
                <Row>
                    <Col md={6}>
                        <h1>Shubham Srivastava Pizza Shop</h1>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus repudiandae recusandae reprehenderit veritatis nostrum tempora, illo, temporibus quaerat minima laborum commodi. Deleniti facilis harum consectetur perferendis in, eius dolore labore. </p>
                        <Table striped bordered hover className="text-center" >
                            <thead>
                                <tr>
                                    <th className="bg-warning text-center" colSpan={3}>---Contact Deatails---</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><FiPhoneCall/></td>
                                    <td>Phone</td>
                                    <td>+91 90671-53883</td>
                                </tr>
                                <tr>
                                    <td><HiOutlineMailOpen/></td>
                                    <td>Email</td>
                                    <td>shubhamsri087@gmail.com</td>
                                </tr>
                                <tr>
                                    <td><FaWhatsapp/></td>
                                    <td>Whatsapp</td>
                                    <td>+91 90671-53883</td>
                                </tr>

                            </tbody>
                        </Table>
                    </Col>
                    <Col md={6}>
                    <Image src={Pizza} style={{width:"100%", height:"100%"}}/>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Contact
