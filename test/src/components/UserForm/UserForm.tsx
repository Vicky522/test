import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { user } from '../../types/user';
import InputField from '../FormControl/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

export type UserFormProps = {
  onSubmit: Function;
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  title: {
    fontSize: '20px',
    textAlign: 'center',
  },
  submit: {
    marginTop: '20px',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: '-10px',
    right: 0,
  },
});

function UserForm(props: UserFormProps) {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string().required('Please enter title'),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Please enter email'),
    position: yup.string().required('Please enter position'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      position: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values: user) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Box className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Typography className={classes.title}>Create New User</Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="name" form={form}></InputField>
        <InputField name="email" label="email" form={form}></InputField>
        <InputField name="position" label="position" form={form}></InputField>

        <Button
          className={classes.submit}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default UserForm;
