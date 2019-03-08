import React from 'react';

export type LayoutType = 'Base' | 'Project';

export interface LayoutContextValue {
  type: LayoutType;
  setLayout: (type: LayoutType) => void;
}

const defaultValue: LayoutContextValue = {
  setLayout: () => {},
  type: 'Base',
};

const LayoutContext: React.Context<LayoutContextValue> = React.createContext(
  defaultValue
);

export default LayoutContext;
