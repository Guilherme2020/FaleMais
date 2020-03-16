import React, { useState, useEffect } from "react";

import { CssBaseline, Typography, Container } from "@material-ui/core";
import SimpleTable from "../../components/Table";
import Header from "../../components/Header";

import Form from "../../components/Form";
import api from "../../services/api";
import { useStyles } from "./styles";

export default function Home() {
  const [listNumbers, setListNumbers] = useState([]);
  const [dataTable, setDataTableSimulate] = useState([]);

  const classes = useStyles();

  const onFetchData = async () => {
    try {
      let response = await api.fetchData();

      setListNumbers(response);
      console.log("response", response);
      // console.log("list numbers", listNumbers)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const setDatTable = dataTableIten => {
    setDataTableSimulate([dataTableIten, ...dataTable]);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="xs sm md lg xl">
        <h1 className={classes.title}>Simulação</h1>
        <Form
          listNumbers={listNumbers}
          setDatTable={setDatTable}
          // verifyTarifOfPhone={verifyTarifOfPhone}
        />

        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: 30 }}
        />
        {dataTable.length > 0 && <SimpleTable list={dataTable} />}
      </Container>
    </React.Fragment>
  );
}
