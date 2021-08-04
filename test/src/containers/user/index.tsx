import { Box, Container } from '@material-ui/core';
import React from 'react';
import Header from '../../components/Header/Header';
import UserTable from '../../components/UserTable/UserTable';

function Users() {
  return (
    <Box>
      <Header />
      <Container>
        <h1>Users Page</h1>
        <UserTable />
      </Container>
    </Box>
  );
}

export default Users;
