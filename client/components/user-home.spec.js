/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from './user-home';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  let userHome;
  const date = new Date();
  let orders = [
    {
      id: 123,
      shippingAdress: '5 Hanover street',
      shipDate: date,
      deliveryDate: null
    }
  ];

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" orders={orders} />);
  });

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });

  it('renders the list of previous orders', () => {
    expect(userHome.find('.shipping-address').text()).to.be.equal(
      '5 Hanover street'
    );
  });

  it('calls componentDidMount', () => {
    expect(userHome.prototype.componentDidMount).to.have.property(
      'callCount',
      1
    );
  });

  it('has an array of values in the props', () => {
    expect(userHome.prop('orders').to.be.array());
  });
});
