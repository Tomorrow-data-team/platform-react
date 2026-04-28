import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Grid } from '@mui/system';

const filter = createFilterOptions();

export default function SearchOne({values, label, data, handleChange, setFieldValue}) {
  const [value, setValue] = React.useState(null);

  const required = ["Channel", "Campaign_Name", "Platform", "Country_Code", "Strategy"]

  //const data = ['Pinterest', 'Michael Owen Youtube ', 'Engagement Campaign', 'Engagement Male Campaign', 'Prospecting', 'Advantage  2', 'Traffic', 'TikTok Outfits', 'TikTok Pyjamas']
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        let finalValue
        //handleChange
        if (typeof newValue === 'string') {
          setValue(newValue.replace("Add: ", ""));
        } else if (newValue && newValue.inputValue) {
          setValue(newValue.inputValue);
        } else {
          setValue(newValue);
        }
        setFieldValue(label, newValue)
      }}

      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push('Add: '+inputValue);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
            {...params}
            value={values[label]}
            key={label}
            name={label}
            label={label.replace("_", " ")}
            my={12}
            required={required.indexOf(label) != -1 ? true : false}
            onChange={handleChange}
            />
      )}
    />
  );
}