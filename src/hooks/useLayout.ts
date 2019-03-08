import { useContext } from 'react';
import LayoutContext, { LayoutType } from '../contexts/LayoutContext';

const useLayout = (nextType: LayoutType) => {
  const { type: currentType, setLayout } = useContext(LayoutContext);

  if (currentType === nextType) {
    return;
  }

  setLayout(nextType);
};

export default useLayout;
