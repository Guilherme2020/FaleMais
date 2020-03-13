import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import SimpleTable from "../../components/Table";
import { loadLists } from "../../services/api";

export default function Home() {
  const [listNumbersCall] = useState(loadLists);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm lg">
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
