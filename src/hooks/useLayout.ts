import { useContext, useEffect } from 'react';
import LayoutContext, { LayoutType } from '../contexts/LayoutContext';

const useLayout = (type: LayoutType) => {
  const { type: layoutType, setLayout } = useContext(LayoutContext);

  if (type === layoutType) {
    return;
  }

  useEffect(() => {
    if (layoutType !== type) {
      setLayout(type);
    }
  });
};

export default useLayout;
