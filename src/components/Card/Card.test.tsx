import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Card, { CardBody, CardHeader } from './Card';

describe('<Card />', () => {
  it('renders a `.sprova-card`', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('.sprova-card')).to.have.lengthOf(1);
  });

  it('simulates click events', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(<Card onClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).to.have.property('callCount', 1);
  });
});
