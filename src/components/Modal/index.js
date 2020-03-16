import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const ModalError = ({ error, handleCloseModal }) => {
  return (
    <Dialog
      open={error}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Aviso"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Por Favor Preencha todos os campos :)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalError;
