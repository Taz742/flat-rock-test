import * as React from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Container, Switch } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import useUsers from "../../hooks/useUsers";
import { TableHeader, Order, SortKeys } from "./TableHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddOrUpdateUser from "../../components/users/add-or-update-user";
import useModal from "../../hooks/useModal";
import { IUser } from "../../contexts/users/interfaces";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

export default function Users() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<SortKeys>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { users, handleDelete, handleActiveStatusChange } = useUsers();

  const { isOpen, item, openModal, closeModal } = useModal<IUser | null>();

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", marginTop: "60px !important" }}>
        <Container>
          <AddCircleIcon
            sx={{
              color: "#305ECA",
              fontSize: 72,
              position: "absolute",
              top: 180,
              cursor: "pointer",
              background: '#fff',
              borderRadius: '50%'
            }}
            onClick={() => openModal()}
          />
          {isOpen && (
            <AddOrUpdateUser isOpen={isOpen} user={item} onClose={closeModal} />
          )}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort as any}
                rowCount={users.length}
              />
              <TableBody>
                {users
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
                            {row.role === "ADMIN" && <VpnKeyIcon />}
                            <Typography
                              sx={{
                                marginLeft: `${
                                  row.role === "ADMIN" ? "10px" : "35px"
                                } !important`,
                              }}
                            >
                              {String(row.role).toLocaleUpperCase()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Switch
                            disabled={row.disabled}
                            checked={row.isActive}
                            onChange={(e) =>
                              handleActiveStatusChange(
                                row.id as number,
                                e.target.checked
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <SettingsIcon
                            onClick={() => {
                              if (row.disabled) return;
                              openModal(row);
                            }}
                            sx={{ cursor: "pointer" }}
                          />
                          <DeleteIcon
                            onClick={() => {
                              if (row.disabled) return;
                              handleDelete(row.id as number);
                            }}
                            sx={{ cursor: "pointer" }}
                          />
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={"Records on page"}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
    </>
  );
}
