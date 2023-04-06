import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { filterpizza } from '../actions/pizzaAction'

const Filter = () => {
    const [searchkey, setsearchkey] = useState('')
    const [catagory, setcatagory] = useState('all')
    const dispatch = useDispatch()
    return (
        <div className='p-4 bg-info mt-4'>
            <Form>
                <Row>
                    <Col>
                        <Form.Control
                            placeholder="Search Pizza"
                            value={searchkey}
                            onChange={(e) => setsearchkey(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <select
                            value={catagory}
                            onChange={(e) => setcatagory(e.target.value)}
                        >
                            <option>all</option>
                            <option>veg</option>
                            <option>nonveg</option>
                        </select>
                    </Col>
                    <Col>
                        <Button onClick={() => { dispatch(filterpizza(searchkey, catagory)) }}>Search</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Filter
