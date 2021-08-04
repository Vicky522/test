import React from 'react';
import PropTypes from 'prop-types';
import { user } from '../../types/user';
import { Box, Container } from '@material-ui/core';
import UserTable from '../../components/UserTable/UserTable';
import Header from '../../components/Header/Header';

export type UsersProps = {
  users: user[];
};

function Users(props: UsersProps) {
  const { users } = props;
  return (
    <Box>
      <Header />
      <Container>
        <h1>Users Page</h1>
        <UserTable users={users} />
      </Container>
    </Box>
  );
}

export default Users;
