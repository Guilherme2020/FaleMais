import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from "@material-ui/core";
import ModalError from "../Modal";
import { calculateWithoutPlan, calculateWithPlan } from "../../utils/";
import { useStyles } from "./styles";

const Form = ({ listNumbers, setDatTable }) => {
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
  const [originList, setOriginList] = useState([]);
  const [destinyList, setDestinyList] = useState([]);
  const [selectOrigin, setSelectOrigin] = useState("");
  const [selectDestiny, setSelectDestiny] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    if (listNumbers.length) {
      let originList = listNumbers.map(o => ({
        id: o.id,
        origin: o.origin
      }));
      let destinyList = listNumbers.map(d => ({
        id: d.id,
        destiny: d.destiny
      }));
      setOriginList(originList);
      setDestinyList(destinyList);
    }
  }, [listNumbers]);

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

  const verifyTarifOfPhone = () => {
    let valueOfMin = "5.90"; // value default case not find item in forEach

    listNumbers.forEach(i => {
      if (i.origin === selectOrigin && i.destiny === selectDestiny) {
        console.log("");
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

    if (
      selectOrigin !== "" &&
      (selectDestiny !== "") & (countMin !== "") &&
      selectedPlan !== ""
    ) {
      setDatTable(dataTable);
      setSelectOrigin("");
      setSelectDestiny("");
      setSelectedPlan("");
      setCountMin("");
    } else {
      setErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <>
      <ModalError error={errorModal} handleCloseModal={handleCloseErrorModal} />
      <Paper elevation={3}>
        <div className={classes.container}>
          <div className={classes.form}>
            <form>
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
            </form>
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
    </>
  );
};
export default Form;
