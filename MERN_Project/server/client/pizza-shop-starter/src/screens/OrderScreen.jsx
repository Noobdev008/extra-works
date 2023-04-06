import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderAction'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Error from '../components/Error'


const OrderScreen = () => {
  const dispatch = useDispatch()
  const orderState = useSelector(state => state.getUserOrdersReducer)
  const { loading, error, orders } = orderState
  useEffect(() => dispatch(getUserOrders()), [dispatch]);
  return (
    <div>
      <h1>Order Screen</h1>
      {loading && (<Loader></Loader>)}
      {error && (<Error error="something went wrong"></Error>)}
      {orders && orders.map(order => (

        <Row>
          <Col md={4}>
            {/* {console.log(orders, " order  ", order.orderItems.name)} */}
            {order.orderItem.map(item => (
              <div>
                <h5>{item.name} [{item.varient}] * {item.quantity} = {item.price}</h5>
              </div>

            ))}
          </Col>
          <Col md={4}>
            <h5>Address</h5>
            <h6>Street : {order.shippingAddress.street}</h6>
            {/* <h6>City : {order.shippingAddress.city}</h6>
            <h6>PinCode : {order.shippingAddress.pincode}</h6>
            <h6>Country : {order.shippingAddress.country}</h6> */}
          </Col>
          <Col md={4}>
            <h4>Order Info</h4>
            <h5>Order Amount: {order.orderAmount}</h5>
            <h5>Transection ID: {order.transectionId}</h5>
            <h5>Order ID: {order._id}</h5>
          </Col>
        </Row>
      ))}

    </div>
  )
}

export default OrderScreen;
