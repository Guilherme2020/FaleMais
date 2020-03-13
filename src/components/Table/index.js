import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable({ list }) {
  const classes = useStyles();
  const [countMin, setCountMin] = useState(Number);
  const [detailIten, setDetailIten] = useState({});
  const [open, setOpen] = useState(false);
  const [errModal, setErrModal] = useState(false);

  const detail = item => {
    console.log("console.log", item);
    setDetailIten(item);
    setOpen(true);
  };

  const handleCloseErrModal = () => {
    setErrModal(false);
  };
  const handleClose = () => {
    setOpen(false);
    setDetailIten({});
  };

  const calculate = (count, valueMin) => {
    return count * valueMin;
  };

  const renderModal = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Simulação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Simule aqui o valor da sua ligação Simule aqui o valor da sua
            ligação Simule aqui o valor da sua ligação Simule aqui o valor da
            sua ligação Simule aqui o valor da sua ligação
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            defaultValue={"1"}
            value={countMin}
            onChange={event => setCountMin(event.target.value)}
            id="min"
            label="Minutos na ligação"
            type="default"
            fullWidth
          />
          <DialogContentText>
            Valor: {calculate(countMin, detailIten.valueForMin)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {}} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const renderModalAlertErr = () => {
    return (
      <Dialog
        open={errModal}
        onClose={handleCloseErrModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Por Favor Preencha todos os campos :)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrModal} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      {renderModal()}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="right">Origem&nbsp;</TableCell>
              <TableCell align="right">Destino&nbsp;</TableCell>
              <TableCell align="right">$/Min/&nbsp;</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.origin}</TableCell>
                <TableCell align="right">{row.destiny}</TableCell>
                <TableCell align="right">{row.valueForMin}</TableCell>
                {/* <TableCell align="right">{row.valueForMin}</TableCell> */}
                <TableCell align="center">
                  <Button
                    onClick={() => detail(row)}
                    variant="contained"
                    color="primary"
                  >
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
