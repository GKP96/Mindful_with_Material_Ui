import React from 'react';
import Button from '@mui/material/Button';

const RenderButton = ({ variant, color, onClick, className, children }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default RenderButton;
