import React from 'react';

export type LayoutType = 'Overview' | 'Project';

export interface LayoutContextValue {
  type: LayoutType;
  setLayout: (type: LayoutType) => void;
}

const defaultValue: LayoutContextValue = {
  setLayout: () => {},
  type: 'Overview',
};

const LayoutContext: React.Context<LayoutContextValue> = React.createContext(
  defaultValue
);

export default LayoutContext;
