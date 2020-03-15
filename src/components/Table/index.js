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
  },
  titleTable: {
    textAlign: "center"
  }
});

export default function SimpleTable({ list, detail }) {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.titleTable}>Simuções dos preços de chamadas </h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="center">Origem&nbsp;</TableCell>
              <TableCell align="center">Destino&nbsp;</TableCell>
              <TableCell align="center">$/Min/&nbsp;</TableCell>
              <TableCell align="center">Tempo</TableCell>
              <TableCell align="center">Plano FM</TableCell>
              <TableCell align="center">Com o Plano</TableCell>
              <TableCell align="center">Sem o Plano</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                {/* <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell> */}
                <TableCell align="center">{row.origin}</TableCell>
                <TableCell align="center">{row.destiny}</TableCell>
                <TableCell align="center">{row.valueForMin}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">Fale {row.planChoise}</TableCell>
                <TableCell align="center">{row.withPlan}</TableCell>
                <TableCell align="center">{row.withoutPlan}</TableCell>

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
