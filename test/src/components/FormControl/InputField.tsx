import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

export type InputFieldProps = {
  form: object;
  name: string;
  label: string;
  disable?: boolean;
};

function InputField(props: InputFieldProps) {
  const { form, name, label, disable } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          disabled={disable}
        />
      )}
    ></Controller>
  );
}

export default InputField;
