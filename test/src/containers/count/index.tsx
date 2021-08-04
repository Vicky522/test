import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Box } from '@material-ui/core';
import Header from '../../components/Header/Header';

function Count() {
  const [count, setCount] = useState<number>(0);
  const handleIncrease = (count: number) => {
    setCount(count + 1);
  };
  const handleReset = (count: number) => {
    if (confirm('Are you sure you want to reset counter?')) {
      setCount(0);
    }
  };

  return (
    <Box>
      <Header />
      <Container>
        <h1>Counter Page</h1>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleIncrease(count);
            }}
          >
            +
          </Button>
          {count}
          <Button
            variant="contained"
            onClick={() => {
              handleReset(count);
            }}
          >
            Reset
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Count;
