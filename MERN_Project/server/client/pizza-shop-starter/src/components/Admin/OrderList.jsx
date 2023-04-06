import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import { deliverOrder, getAllOrders } from '../../actions/orderAction'
import Loader from './../Loader'
import Error from './../Error'

const OrderList = () => {

  const dispatch = useDispatch()
  const allordersState = useSelector(state => state.allUserOrdersReducer)
  const { loading, error, orders } = allordersState
  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  return (
    <>
      <h1>OrderList</h1>
      {loading && <Loader></Loader>}
      {error && <Error error="Opps! Something Wrong!"></Error>}
      <Table striped bordered hover>
        <thead>
          <tr> 
            <th>Order Id</th>
            <th>Email</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.email}</td>
              <td>{order.userID}</td>
              <td>Rs {order.orderAmount}/-</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.isDeliverd ?
                (<h6 className='text-success'>Deliverd</h6>) :
                (<><Button className='btn-danger'
                  onClick={() => dispatch(deliverOrder(order._id))}
                >Deliver</Button></>)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default OrderList
