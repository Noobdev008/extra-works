import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deletePizza, getAllPizzas } from '../../actions/pizzaAction'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Container, Table } from 'react-bootstrap'
import Pizza from '../../components/Pizza'
import Loader from '../../components/Loader'
import Error from '../../components/Error';
const PizzaList = () => {
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
                    : error ? (<Error>Error while Fectching Pizza {error}</Error>) :
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Img</th>
                                        <th>Pizza Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pizzas && pizzas.map(pizza => (
                                            <tr className='text-center'>
                                                <td>
                                                    <img src={pizza.image} style={{ width: "200px" }} />
                                                </td>
                                                <td>{pizza.name}</td>
                                                <td>small:{pizza.prices[0]["small"]}
                                                    <br></br>
                                                    medium:{pizza.prices[0]["medium"]}
                                                    <br></br>
                                                    large:{pizza.prices[0]["large"]}
                                                </td>
                                                <td>{pizza.category}</td>
                                                <td>
                                                    <Link to={`/admin/editpizza/${pizza._id}`}>
                                                        <AiFillEdit style={{ cursor: 'pointer' }}></AiFillEdit>
                                                    </Link>
                                                    <br></br>
                                                    <AiFillDelete style={{color:"red", cursor:"pointer"}} onClick={()=>{dispatch(deletePizza(pizza._id))}}></AiFillDelete>
                                                </td>
                                            </tr>

                                        ))

                                    }
                                </tbody>
                            </Table>
                        </div>
                }

            </Container>
        </>
    )
}

export default PizzaList
