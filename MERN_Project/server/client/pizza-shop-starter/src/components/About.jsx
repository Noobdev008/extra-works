import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Kunal from '../assets/Images/Kunal_Kapoor.jpg'
import Ranveer from '../assets/Images/Ranver_Brar.jpg'
import Sanjeev from '../assets/Images/Sanjeev_Kapoor.jpg'
import Vikas from '../assets/Images/Vikas_Khanna.jpg'

const About = () => {
    return (
        <>
            <Container style={{ marginTop: "50px" }}>
                <h1>WHo are we</h1>
                <p>Since our modest beginnings in 2005 with a little space in Toronto’s stylish Yorkville locale, ‘Shubham's Kitchen’ ‘s development has been enlivened with the energy to cook and serve solid, Indian-roused takeout food.

                    In contrast to other Indian eateries, ‘Shubham's Kitchen’ was made with the explicit expectation to appear as something else.

                    We realize numerous individuals love Indian sustenance, yet a large number of them loathe or are unconscious of the regularly unfortunate fixings that make run-of-the-mill Indian nourishment taste so great.

                    Our menu highlights things that utilization the sound and fragrant flavors, however, forgets the stuffing ghee, spread, oil, and overwhelming cream.

                    ‘Shubham's Kitchen’ has developed to incorporate four superb takeout areas in Toronto with additional to come sooner rather than later. Our group takes pride in the way that we can furnish our new and faithful clients with extraordinary tasting Indian-roused nourishment that is not normal for that at some other Indian eatery you visit.

                    We perceive that a few people are as yet searching for the run-of-the-mill Indian nourishment, and that is fine with us. Our disclaimer is that on the off chance that you’re anticipating overwhelming, slick, undesirable Indian nourishment, ‘Shubham's Kitchen’ isn’t the place for you

                    Our expectation is that you’ll join the developing pattern that such a large number of others have officially found and you will attempt ‘Shubham's Kitchen’ as a remarkable option to other Indian eateries as well as to all other solid sustenance alternatives out there!</p>
                <h1>Our Speciality</h1>
                
                <Row>
                    <Col md={6}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatem explicabo ullam iste dolorum consectetur minus autem, unde nisi ex aliquid quaerat? A aut harum beatae officiis adipisci rerum quis.</p>
                    </Col>
                    <Col md={6}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quibusdam sint minus rem eligendi error ducimus assumenda eveniet totam perferendis. Provident omnis ipsa, mollitia assumenda magni maiores perspiciatis magnam repellat.</p>
                    </Col>
                </Row>
                <Row>
                    <h1>Our Chef</h1>
                    <Col md={3}>
                        <img src={Kunal}></img>
                        <h3>Kunal Kapoor</h3>
                    </Col>
                    <Col md={3}>
                        <img src={Ranveer}></img>
                        <h3>Ranveer Brar</h3>
                    </Col>
                    <Col md={3}>
                        <img src={Sanjeev} style={{ width: "230px" }}></img>
                        <br />
                        <h3>Sanjeev Kapoor</h3>
                    </Col>
                    <Col md={3}>
                        <img src={Vikas} style={{ width: "200px" }}></img>
                        <br />
                        <h3>Vikas Khanna</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About
