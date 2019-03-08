import { mount, render, shallow } from 'enzyme';
import React from 'react';

import BaseLayout from './BaseLayout';

it('renders without crashing', () => {
  shallow(<BaseLayout />);
});
