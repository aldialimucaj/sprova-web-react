import { mount, render, shallow } from 'enzyme';
import React from 'react';

import ProjectLayout from './ProjectLayout';

it('renders without crashing', () => {
  shallow(<ProjectLayout />);
});
