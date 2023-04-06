import React from 'react'
import StripeCheckOut from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderAction'
import Loader from './Loader'
import Error from './Error'
import Success from './Success'
const Checkout = ({ subTotal }) => {
  const orderState = useSelector(state => state.placeOrderReducer)
  const { loading, error, success } = orderState
  const dispatch = useDispatch()

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal))
    console.log(token, " token");

  }
  return (

    <>
      {
        loading && <Loader></Loader>
      }
      {error && <Error error="something went wrong"></Error>}
      {success && <Success success="order successfully placed"></Success>}
      <StripeCheckOut
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51LiHuQSHhFc0OYu64TowBCAKBmLd0FzNbbTHf0ftXCbOIMWQ5htxbkXayeUH9HOvT6LP2FP4U5fDP2tG1w4wayGA00NbGdB2bz"
        currency='inr'
      >
        <Button>Pay Now</Button>
      </StripeCheckOut>
    </>
  )
}

export default Checkout
