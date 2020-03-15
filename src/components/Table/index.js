import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable({ list, detail }) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="right">Origem&nbsp;</TableCell>
              <TableCell align="right">Destino&nbsp;</TableCell>
              <TableCell align="right">$/Min/&nbsp;</TableCell>
              <TableCell align="center">Tempo</TableCell>
              <TableCell>Plano FM</TableCell>
              <TableCell>Com o Plano</TableCell>
              <TableCell>Sem o Plano</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                {/* <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell> */}
                <TableCell align="right">{row.origin}</TableCell>
                <TableCell align="right">{row.destiny}</TableCell>
                <TableCell align="right">{row.valueForMin}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.planChoise}</TableCell>
                <TableCell align="right">{row.withoutPlan}</TableCell>

                {/* <TableCell align="right">{row.valueForMin}</TableCell> */}
                {/* <TableCell align="center">
                  <Button
                    onClick={() => detail(row)}
                    variant="contained"
                    color="primary"
                  >
                    Visualizar
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
