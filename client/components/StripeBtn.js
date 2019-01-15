import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {stripePublishableKey} from '../../secrets';
import history from '../history';

const stripeBtn = props => {
  const publishableKey = stripePublishableKey;

  const onToken = token => {
    const body = {
      amount: props.total,
      token: token
    };
    axios
      .post('http://localhost:8080/payment', body)
      .then(response => {
        history.push('/cart/confirmation');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };
  console.log(history);
  return (
    <div>
      <StripeCheckout
        label="Pay With Card" //Component button text
        name="Say Cheese" //Modal Header
        panelLabel="Pay" //Submit button in modal
        amount={props.total} //Amount in cents
        token={onToken}
        stripeKey={publishableKey}
        billingAddress={true}
      />
    </div>
  );
};
export default stripeBtn;
