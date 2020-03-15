import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
  },
  container: {
    width: "100%",
    height: 180
  },
  title: {
    textAlign: "center"
  },
  form: {
    display: "flex",
    width: "100%",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  btnForm: {
    padding: 10,
    paddingTop: 50,
    width: "100%"
  }
}));
