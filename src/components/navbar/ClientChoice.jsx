import Box from '@mui/material/Box';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function ClientChoice() {
  return (
    <Box sx={{ minWidth: 240 }}>
      <FormControl fullWidth>
        {/*<InputLabel variant="standard" htmlFor="uncontrolled-native">
          Client
        </InputLabel>*/}
        <NativeSelect
          defaultValue={'Peacocks'}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={'peacocks'}>Peacocks</option>
          <option value={'prezzo'}>Prezzo</option>
          <option value={'Amazon'}>Amazon</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}