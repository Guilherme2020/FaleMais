import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SimpleTable from "../../components/Table";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";
import api from "../../services/api";
import { MenuItem } from "@material-ui/core";

const plansSelect = [
  {
    id: 1,
    plan: "30"
  },
  {
    id: 2,
    plan: "60"
  },
  {
    id: 3,
    plan: "120"
  }
];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Home() {
  const [listNumbersCall, setListNumbers] = useState([]);
  const [countMin, setCountMin] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [detailIten, setDetailIten] = useState({});
  const [open, setOpen] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const classes = useStyles();

  const onFetchData = async () => {
    let response = await api.fetchData();
    setListNumbers(response);
  };

  useEffect(() => {
    onFetchData();
  }, []);
  const handleChange = event => {
    console.log("event", event);
    setSelectedPlan(event.target.value);
  };
  const renderOptions = () => {
    return plansSelect.map(i => {
      return (
        <MenuItem
          label="Selecione um plano"
          value={i.plan}
          key={i.id}
          name={i.plan}
          // onClick={() => console.log(i)}
        >
          {i.plan}
        </MenuItem>
      );
    });
  };
  const detailItens = item => {
    console.log(item);
    setDetailIten(item);
    setOpen(true);
  };

  // const detail = async item => {
  //   console.log("console.log", item);
  //   setDetailIten(item);
  //   // setOpen(true);
  // };

  const handleCloseErrModal = () => {
    setErrModal(false);
  };
  const handleClose = () => {
    setOpen(false);
    setDetailIten({});
  };

  const calculateNotPlan = (count, valueMin) => {
    let value = count * valueMin;
    let formate = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    return `${formate}`;
  };
  const calculateWithPlan = () => {
    let plan = selectedPlan;
    let count = countMin;
    let diff = count - plan;
    let calc = 0;
    console.log("entrou aq");
    const percent = (10 / 100) * detailIten.valueForMin * diff;
    console.log(percent);
    calc = detailIten.valueForMin * diff;

    let final = calc + percent;
    if (diff < plan) {
      final = 0;
    }
    return final.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
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
            label="Minutos da ligação"
            type="default"
            fullWidth
          />
          <DialogContentText>
            Valor sem nenhum plano:{" "}
            {calculateNotPlan(countMin, detailIten.valueForMin)}
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Planos</InputLabel>
            <Select
              value={selectedPlan}
              onChange={(event, value) => handleChange(event)}
            >
              {renderOptions()}
            </Select>
            {<p>plan selecionado{selectedPlan}</p>}
            Valor com o plano escolhido: {""}
            {calculateWithPlan()}
          </FormControl>
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
    <React.Fragment>
      <CssBaseline />
      <Header />
      {renderModal()}
      <Container maxWidth="xs sm md lg xl">
        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: 30 }}
        />
        <SimpleTable list={listNumbersCall} detail={detailItens} />
      </Container>

      {/* <SimpleTable /> */}
    </React.Fragment>
  );
}
