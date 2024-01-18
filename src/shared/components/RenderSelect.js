import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const RenderSelect = ({ id, label, options, value, onChange, error, helperText }) => {
  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        label={label}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <p className="text-red-600 text-sm">{helperText}</p>}
    </FormControl>
  );
};

export default RenderSelect;
