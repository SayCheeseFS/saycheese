import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {stripePublishableKey} from '../../secrets'
const stripeBtn = props => {
  const publishableKey = stripePublishableKey

  const onToken = token => {
    const body = {
      amount: props.total,
      token: token
    }
    axios
      .post('http://localhost:8080/payment', body)
      .then(response => {
        alert('Payment Success')
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        alert('Payment Error')
      })
  }
  return (
    <StripeCheckout
      label="Pay With Card" //Component button text
      name="Say Cheese" //Modal Header
      panelLabel="Pay" //Submit button in modal
      amount={props.total} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  )
}
export default stripeBtn
