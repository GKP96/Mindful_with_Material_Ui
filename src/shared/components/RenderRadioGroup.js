import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const RenderRadioGroup = ({ name, value, onChange, options }) => {
  return (
    <RadioGroup
      row
      aria-label={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default RenderRadioGroup;
