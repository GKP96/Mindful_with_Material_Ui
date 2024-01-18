import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const RenderCheckboxGroup = ({ options, selectedOptions, onChange }) => {
  return (
    <>
      {options.map((option) => (
        <div className="grid grid-cols-2 sm: grid-col-4">
        <FormControlLabel
          key={option.value}
          control={
              <Checkbox
                checked={selectedOptions.includes(option.value)}
                onChange={() =>
                  onChange((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((item) => item !== option.value)
                      : [...prev, option.value]
                  )
                }
            />
          }
          label={option.label}
        /></div>
      ))}
      </>
  );
};

export default RenderCheckboxGroup;
