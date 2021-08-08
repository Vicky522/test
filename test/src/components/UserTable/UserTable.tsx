import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import usersApi from '../../pages/api/usersApi';
import { user } from '../../types/user';
import UserDialog from '../Dialogs/UserDialog';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  dialog: {
    margin: '20px 10px',
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export default function UserTable() {
  const classes = useStyles();

  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<user[]>([]);
  const [filters, setFilters] = useState({
    page: 0,
    limit: 5,
  });
  const totalPage = Math.ceil(totalUsers / filters.limit);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, totalUsers } = await usersApi.getAll({
          ...filters,
          page: filters.page + 1,
        });
        setUsers(data);
        setTotalUsers(totalUsers);
      } catch (e) {
        console.log('Failed to fetch users', e.message);
      }
    };

    fetchUsers();
  }, [filters]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((filter) => ({
      ...filter,
      limit: +event.target.value,
    }));
  };

  const titles = ['Name', '@ Email', 'Position'];
  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {titles.map((title, index) => (
                <StyledTableCell key={index}>{title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.position}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={classes.dialog}>
        <UserDialog />
      </Box>

      {totalUsers && (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={totalUsers}
          rowsPerPage={filters.limit}
          page={filters.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
