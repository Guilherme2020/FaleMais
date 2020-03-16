import React, { useState, useEffect, useRef } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  InputLabel,
  Select,
  FormControl,
  Button,
  MenuItem,
  Paper
} from "@material-ui/core";
import SimpleTable from "../../components/Table";
import Header from "../../components/Header";
import ModalError from "../../components/Modal";
import api from "../../services/api";
import { calculateWithoutPlan, calculateWithPlan } from "../../utils/";
import { useStyles } from "./styles";

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
  const [errorModal, setErrorModal] = useState(false);
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

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  const verifyTarifOfPhone = () => {
    console.log(selectOrigin);
    console.log(selectDestiny);
    console.log(countMin);
    console.log(selectedPlan);

    let valueOfMin = "5.90"; // value default case not find item in forEach

    listNumbersCall.forEach(i => {
      if (i.origin === selectOrigin && i.destiny === selectDestiny) {
        console.log("?");
        valueOfMin = i.valueForMin;
      }
    });

    console.log(valueOfMin);
    // selectedPlan,countMin
    const dataTable = {
      origin: selectOrigin,
      destiny: selectDestiny,
      valueForMin: valueOfMin,
      time: countMin,
      planChoise: selectedPlan,
      withPlan: calculateWithPlan(selectedPlan, countMin, valueOfMin),
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
      setErrorModal(true);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="xs sm md lg xl">
        <ModalError
          error={errorModal}
          handleCloseModal={handleCloseErrorModal}
        />
        <h1 className={classes.title}>Simulação</h1>
        <Paper elevation={3}>
          <div className={classes.container}>
            <div className={classes.form}>
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
            <div className={classes.btnForm}>
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
