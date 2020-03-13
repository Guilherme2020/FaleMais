import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import SimpleTable from "../../components/Table";
import api from "../../services/api";

export default function Home() {
  const [listNumbersCall, setListNumbers] = useState([]);

  const onFetchData = async () => {
    let response = await api.fetchData();
    setListNumbers(response);
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="xs sm md lg xl">
        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: 30 }}
        />
        <SimpleTable list={listNumbersCall} />
      </Container>

      {/* <SimpleTable /> */}
    </React.Fragment>
  );
}
