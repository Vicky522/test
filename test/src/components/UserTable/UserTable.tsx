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
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
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

export default function UserTable(props: { users: user[] }) {
  const { users } = props;

  const classes = useStyles();
  const titles = ['Name', '@ Email', 'Position'];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {titles.map((title, index) => (
              <StyledTableCell key={index} align="right">
                {title}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users?.map((user) => (
            <StyledTableRow key={user.id}>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.position}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
