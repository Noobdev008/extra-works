import React, { useEffect } from 'react'
// import AllPizza from '../pizza-data'
import { getAllPizzas } from '../actions/pizzaAction'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Pizza from '../components/Pizza'
import Loader from '../components/Loader'
import Error from '../components/Error';
import Filters from '../components/Filter'
const HomeScreen = () => {
    const dispatch = useDispatch();
    const pizzaState = useSelector(state =>
        state.getAllPizzaReducer
    )
    const { loading, pizzas, error } = pizzaState
    useEffect(() => {
        dispatch(getAllPizzas())
    }, [dispatch])

    return (
        <>
            <Container>
                {loading ? (<Loader></Loader>)
                    : error ? (<Error>Error while Fectching Pizza {error}</Error>)
                        : <Row>
                            <Filters />
                            {pizzas.map(pizza => (
                                <Col md={4}>
                                    <Pizza pizza={pizza} />
                                </Col>
                            ))}

                        </Row>
                }

            </Container>
        </>
    )
}

export default HomeScreen
