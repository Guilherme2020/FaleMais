import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SimpleTable from "../../components/Table";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";
import api from "../../services/api";
import { MenuItem } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// const plansSelect = [

// ];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function Home() {
  const [listNumbersCall, setListNumbers] = useState([]);
  const [countMin, setCountMin] = useState("");
  const [plansSelect] = useState([
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
  ]);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [dataTableSimulate, setDataTableSimulate] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [destinyList, setDestinyList] = useState([]);
  const [selectOrigin, setSelectOrigin] = useState("");
  const [selectDestiny, setSelectDestiny] = useState("");
  const inputLabel = useRef(null);
  const [errModal, setErrModal] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const classes = useStyles();
  const onFetchData = async () => {
    try {
      let response = await api.fetchData();
      setListNumbers(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onFetchData();
    setLabelWidth(inputLabel.current.offsetWidth);
    if (listNumbersCall.length > 0) {
      let originList = listNumbersCall.map(o => ({
        id: o.id,
        origin: o.origin
      }));
      let destinyList = listNumbersCall.map(d => ({
        id: d.id,
        destiny: d.destiny
      }));
      setOriginList(originList);
      setDestinyList(destinyList);
      console.log(dataTableSimulate);
    }
  }, [listNumbersCall, dataTableSimulate]);

  const handleChangeOrigin = event => {
    setSelectOrigin(event.target.value);
  };
  const handleChangeDestiny = event => {
    setSelectDestiny(event.target.value);
  };

  const renderOptionsPlan = () => {
    return plansSelect.map(i => {
      return (
        <MenuItem value={i.plan} key={i.id} name={i.plan}>
          {i.plan}
        </MenuItem>
      );
    });
  };
  const renderOptionsOrigin = () => {
    return originList.map(o => {
      return (
        <MenuItem value={o.origin} key={o.id} name={o.origin}>
          {o.origin}
        </MenuItem>
      );
    });
  };
  const renderOptionsDestiny = () => {
    return destinyList.map(d => {
      return (
        <MenuItem value={d.destiny} key={d.id} name={d.destiny}>
          {d.destiny}
        </MenuItem>
      );
    });
  };

  const handleCloseErrModal = () => {
    setErrModal(false);
  };

  const calculateWithoutPlan = (count, valueMin) => {
    let value = count * valueMin;
    let formate = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    return `${formate}`;
  };

  const calculateWithPlan = valueForMin => {
    let plan = selectedPlan;
    let count = countMin;
    let diff = count - plan;
    let calc = 0;
    const percent = (10 / 100) * valueForMin * diff;
    // console.log(percent);
    calc = valueForMin * diff;

    let final = calc + percent;
    if (final < 0) {
      final = 0;
    }
    return final.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };
  const verifyTarifOfPhone = () => {
    console.log(selectOrigin);
    console.log(selectDestiny);
    console.log(countMin);
    console.log(selectedPlan);

    let valueOfMin = 0;

    listNumbersCall.forEach(i => {
      if (i.origin === selectOrigin && i.destiny === selectDestiny) {
        valueOfMin = i.valueForMin;
      } else {
        const defaultPrice = "5.90";
        valueOfMin = defaultPrice;
      }
    });

    console.log(valueOfMin);

    const dataTable = {
      origin: selectOrigin,
      destiny: selectDestiny,
      valueForMin: valueOfMin,
      time: countMin,
      planChoise: selectedPlan,
      withPlan: calculateWithPlan(valueOfMin),
      withoutPlan: calculateWithoutPlan(countMin, valueOfMin)
    };
    console.log("datable mount", dataTable);
    if (
      selectOrigin !== "" &&
      (selectDestiny !== "") & (countMin !== "") &&
      selectedPlan !== ""
    ) {
      setDataTableSimulate([dataTable, ...dataTableSimulate]);
    } else {
    }
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
      <Container maxWidth="xs sm md lg xl">
        <h1 style={{ textAlign: "center" }}>Simulação</h1>
        <Paper elevation={3}>
          <div
            style={{
              width: "100%",
              height: 180
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                paddingTop: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FormControl variant="outlined" className={classes.root}>
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Origem
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectOrigin}
                  onChange={handleChangeOrigin}
                  labelWidth={labelWidth}
                >
                  {renderOptionsOrigin()}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.root}>
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Destino
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectDestiny}
                  onChange={handleChangeDestiny}
                  labelWidth={labelWidth}
                >
                  {renderOptionsDestiny()}
                </Select>
              </FormControl>
              <FormControl className={classes.root}>
                <TextField
                  id="outlined-basic"
                  label="Quantidade de Minutos"
                  variant="outlined"
                  value={countMin}
                  onChange={event => setCountMin(event.target.value)}
                />
              </FormControl>
              <FormControl variant="outlined" className={classes.root}>
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Selecione o Plano
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedPlan}
                  onChange={event => setSelectedPlan(event.target.value)}
                  labelWidth={labelWidth}
                >
                  {renderOptionsPlan()}
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                padding: 10,
                paddingTop: 50,
                width: "100%"
              }}
            >
              <Button
                onClick={() => verifyTarifOfPhone()}
                variant="contained"
                color="primary"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </Paper>
        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: 30 }}
        />
        {dataTableSimulate.length > 0 && (
          <SimpleTable list={dataTableSimulate} />
        )}
      </Container>
    </React.Fragment>
  );
}
