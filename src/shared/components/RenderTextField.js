import React from 'react';
import TextField from '@mui/material/TextField';

const RenderTextField = ({ id, label, variant, fullWidth, value, onChange, error, helperText }) => {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default RenderTextField;
