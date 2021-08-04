import { Box } from '@material-ui/core';
import Users from '../../containers/user';
import { user } from '../../types/user';
import usersApi from './../api/usersApi';

export type userProps = {
  result: user[];
};

export default function UserPage(props: userProps) {
  const { result } = props;
  return (
    <Box>
      <Users users={result} />
    </Box>
  );
}

export const getStaticProps = async () => {
  let result: user[] = [];

  try {
    const response = await usersApi.getAll({});
    result = response.data;
  } catch (e) {
    console.log('failed to fetch Users', e);
  }

  return {
    props: {
      result,
      revalidate: 60,
    },
  };
};
