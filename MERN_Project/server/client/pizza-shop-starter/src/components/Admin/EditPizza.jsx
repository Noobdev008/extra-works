import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPizzaById, updatePizza } from '../../actions/pizzaAction'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Loader from './../Loader'
import Error from './../Error'
import Success from './../Success'
const EditPizza = ({ match }) => {
  const [name, setName] = useState()
  const [smallPrice, setsmallPrice] = useState([])
  const [largePrice, setlargePrice] = useState([])
  const [mediumPrice, setmediumPrice] = useState([])
  const [image, setimage] = useState('')
  const [description, setdescription] = useState('')
  const [category, setcategory] = useState('')

  const dispatch = useDispatch();
  const getPizzaByState = useSelector(state => state.getPizzaByIdReducer)
  const { loading, error, pizza } = getPizzaByState

  const updatePizzaState = useSelector(state => state.updatePizzaBIdReducer)
  const { updateloading, updatesuccess, updateerror } = updatePizzaState

  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaId) {
        setName(pizza.name)
        setdescription(pizza.description)
        setcategory(pizza.category)
        setimage(pizza.image)
        setsmallPrice(pizza.prices[0]["small"])
        setmediumPrice(pizza.prices[0]["medium"])
        setlargePrice(pizza.prices[0]["large"])
      } else {
        dispatch(getPizzaById(match.params.pizzaId))
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaId))
    }
  }, [pizza, dispatch])

  const submitForm = (e) => {

    e.preventDefault()
    const updatedPizza = {
      _id: match.params.pizzaId,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    }
    dispatch(updatePizza(updatedPizza));
  }

  return (
    <div>
      {updateloading && <Loader></Loader>}
      {error && <Error error="add new pizza error"></Error>}
      {/* {success && <Success success="add new pizza success"></Success>} */}
      <Form onSubmit={submitForm} className='bg-light p-4'>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Small Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="small price"
                value={smallPrice}
                onChange={(e) => setsmallPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Medium Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="medium price"
                value={mediumPrice}
                onChange={(e) => setmediumPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Large Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="large price"
                value={largePrice}
                onChange={(e) => setlargePrice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="add image url"
              value={image}
              onChange={(e) => setimage(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Update
        </Button>
      </Form>
    </div>
  )
}

export default EditPizza
