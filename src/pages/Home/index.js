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
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#ffffff", height: 30 }}
        />
      </Container>
      <SimpleTable />

      {/* <SimpleTable /> */}
    </React.Fragment>
  );
}
