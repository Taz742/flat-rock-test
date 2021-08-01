import * as React from "react";
import { IUser } from "../../contexts/users/interfaces";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
} from "@material-ui/core";
import { visuallyHidden } from "@material-ui/utils";
import { SortKeys, Order } from './interfaces';

interface HeadCell {
  id: SortKeys;
  label: string;
}

const headCells: readonly HeadCell[] = [
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

interface IProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IUser
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function TableHeader(props: IProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IUser) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: "10px" }} />
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                marginLeft: headCell.id === "role" ? "35px !important" : undefined,
              }}
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
        <TableCell align="center">Details</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
