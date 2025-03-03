import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { confirmAlert } from "react-confirm-alert";
import MapIcon from "@material-ui/icons/Map";

function createData(officeLoc, WSId, sDate, eDate, officeOwner, status) {
  return { officeLoc, WSId, sDate, eDate, officeOwner, status };
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F1F4F8"
    }
  }
}))(TableRow);

const rows = [
  createData("North Vancouver", "NV4-03A", "2020-04-22", "2020-04-25", "Kobe Bryant", "Active"),
  createData("North Vancouver", "NV4-03B", "2020-04-21", "2020-04-23", "Kevin Wei", "Active"),
  createData("West Vancouver", "WV1-01D", "2020-04-12", "2020-04-15", "Ravina Gill", "Active"),
  createData("West Vancouver", "WV1-01E", "2020-03-12", "2020-03-15", "Lihn Phan", "Active"),
  createData("Richmond", "R4-05Z", "2020-05-11", "2020-05-12", "Charlie Chen", "Active"),
  createData("North Vancouver", "NV7-04T", "2020-07-01", "2020-07-03", "Srijon Saha", "Active"),
  createData("West Vancouver", "WV6-08R", "2020-04-18", "2020-04-20", "John Zou", "Active"),
  createData("North Vancouver", "NV5-03T", "2020-01-21", "2020-01-23", "Kevin Wei", "Inactive")
];

function descendingComparator(a, b, property) {
  if (b[property] < a[property]) {
    return -1;
  }
  if (b[property] > a[property]) {
    return 1;
  }
  return 0;
}

function getComparator(order, property) {
  return order == "desc"
    ? (a, b) => descendingComparator(a, b, property)
    : (a, b) => -descendingComparator(a, b, property);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
const headCells = [
  { id: "officeLoc", numeric: false, label: "Office Location" },
  { id: "WSId", numeric: false, label: "Workspace Id" },
  { id: "sDate", label: "Start Date" },
  { id: "eDate", label: "End Date" },
  { id: "Office Owner", label: "Office Owner" },
  { id: "status", label: "Status" }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {/*<TableCell padding="checkbox">*/}
        {/*  <Checkbox*/}
        {/*    style={{*/}
        {/*      color: "#002D7D"*/}
        {/*    }}*/}
        {/*    indeterminate={numSelected > 0 && numSelected < rowCount}*/}
        {/*    checked={rowCount > 0 && numSelected === rowCount}*/}
        {/*    onChange={onSelectAllClick}*/}
        {/*    inputProps={{ "aria-label": "select all desserts" }}*/}
        {/*  />*/}
        {/*</TableCell>*/}
        {headCells.map(headCell => (
          <TableCell
            className={`${classes.headText}`}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={`${classes.headText}`}>Floor Plan</TableCell>
        <TableCell className={`${classes.headText}`}>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));
const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Nutrition
        </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  headText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.05em",
    color: "#606F89"
  },
  rowText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#2E3B52"
  }
}));
export default function ManageTables() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log("Handle Clicked" + name);
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const openModal = floorId => () => {
    this.setState({ openModal: true });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/*<EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      // change here to make rows independent even with the same office name
                      key={row.name}
                      selected={isItemSelected}
                      className={`${classes.headText}`}
                    >
                      {/*<TableCell padding="checkbox">*/}
                      {/*  <Checkbox*/}
                      {/*    style={{*/}
                      {/*      color: "#002D7D"*/}
                      {/*    }}*/}
                      {/*    checked={isItemSelected}*/}
                      {/*    inputProps={{ "aria-labelledby": labelId }}*/}
                      {/*  />*/}
                      {/*</TableCell>*/}
                      <TableCell />
                      <TableCell align="left" scope="row" className={`${classes.rowText}`}>
                        {row.officeLoc}
                      </TableCell>
                      <TableCell align="center" className={`${classes.rowText}`} padding={"none"}>
                        {row.WSId}
                      </TableCell>
                      <TableCell align="center" className={`${classes.rowText}`}>
                        {row.sDate}
                      </TableCell>
                      <TableCell align="center" className={`${classes.rowText}`}>
                        {row.eDate}
                      </TableCell>
                      <TableCell align="center" className={`${classes.rowText}`}>
                        {row.officeOwner}
                      </TableCell>
                      <TableCell align="left" className={`${classes.rowText}`}>
                        <MapIcon />
                      </TableCell>
                      <TableCell>
                        <MapIcon />
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
