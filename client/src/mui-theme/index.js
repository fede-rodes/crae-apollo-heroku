import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  switch: {
    colorPrimary: green[500],
    trackOnColor: green[100],
    thumbOffColor: red[700],
    trackOffColor: red[100],
  },
});

export default theme;
