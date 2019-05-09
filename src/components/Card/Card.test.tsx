import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Card, { CardBody, CardHeader } from './Card';

describe('<Card />', () => {
  it('renders a `.sprova-card`', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('.sprova-card')).toHaveLength(1);
  });
});
