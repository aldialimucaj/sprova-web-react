import React from 'react';
import './PageContent.scss';

interface Props {
  header?: React.ReactNode;
}

const PageContent: React.FunctionComponent<Props> = ({ children, header }) => {
  return <div className="sprova-page-content">{children}</div>;
};

export default PageContent;
