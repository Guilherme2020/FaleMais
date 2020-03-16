import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  styleTypography: {
    backgroundColor: "transparent",
    height: 30
  },

  container: {
    width: "100%",
    height: 180
  },
  title: {
    textAlign: "center"
  }
}));
