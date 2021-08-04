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
import usersApi from '../../pages/api/usersApi';
import { user } from '../../types/user';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, totalUsers } = await usersApi.getAll({
          page: filters.page + 1,
          limit: filters.limit,
        });
        setUsers(data);
        setTotalUsers(totalUsers);
      } catch (e) {
        console.log('Failer fetch users: ', e);
      }
    })();
  }, [filters]);

  const handleChangePage = (e: unknown, newPage: number) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((filter) => ({
      ...filter,
      limit: +event.target.value,
      page: 1,
    }));
  };

  const titles = ['Name', '@ Email', 'Position'];
  console.log('user', users);
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
