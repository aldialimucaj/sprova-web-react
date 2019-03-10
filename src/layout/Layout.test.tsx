import { mount, render, shallow } from 'enzyme';
import React from 'react';

import BaseLayout from './Layout';

it('renders without crashing', () => {
  shallow(<BaseLayout />);
});
