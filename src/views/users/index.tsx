import * as React from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { visuallyHidden } from "@material-ui/utils";
import { Container, Switch } from "@material-ui/core";
import SearchAppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { IUser, Role } from '../../contexts/users/interfaces';

function createData(
  name: string,
  surname: string,
  email: string,
  role: Role,
  isActive: boolean,
  disabled: boolean
): IUser {
  return {
    name,
    surname,
    email,
    role,
    isActive,
    disabled,
  };
}

const rows = [
  createData("Tazo", "Leladze", "taz742b@gmail.com", "ADMIN", true, false),
  createData("Tatia", "Garuchava", "taz743b@gmail.com", "USER", false, false),
  createData("Saxeli", "Gvari", "taz744b@gmail.com", "USER", false, true),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type SortableColumns = Pick<Data, "name" | "role" | "isActive">;

type SortKeys = keyof SortableColumns;

interface HeadCell {
  id: SortKeys;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {} as any,
  {
    id: "name",
    label: "User",
  },
  {
    id: "role",
    label: "Role",
  },
  {
    id: "isActive",
    label: "Status",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IUser
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IUser) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === headCells.length - 1 ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: index === 0 ? "10px" : undefined }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<SortKeys>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <SearchAppBar />
      <Box sx={{ width: "100%", height: "100%", marginTop: "60px !important" }}>
        <Container>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort as any}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ opacity: row.disabled ? "0.4" : "1" }}
                      >
                        <TableCell align="left">
                          <AccountCircleIcon sx={{ fontSize: 45 }} />
                        </TableCell>
                        <TableCell align="left">
                          <Box display="flex" flexDirection="column">
                            <Typography>{`${row.name} ${row.surname}`}</Typography>
                            <Typography sx={{ fontWeight: 200, fontSize: 16 }}>
                              {`${row.email}`}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Box display="flex" alignItems="center">
                            <VpnKeyIcon />
                            <Typography sx={{ marginLeft: "10px !important" }}>
                              {String(row.role).toLocaleUpperCase()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Switch checked={row.isActive} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
    </>
  );
}
