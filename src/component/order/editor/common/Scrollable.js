/* eslint-disable import/no-anonymous-default-export */
import Scrollbars from '@layerhub-io/react-custom-scrollbar';
import React from 'react';

const Scrollable = ({ children, autoHide }) => {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <div style={{ height: '100%', width: '100%', position: 'absolute', overflow: 'hidden' }}>
        <Scrollbars autoHide={autoHide}>{children}</Scrollbars>
      </div>
    </div>
  );
};

export default Scrollable;
