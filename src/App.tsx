import React from 'react';
import Index from './components/Index'
import { BrowserRouter as Router, Route,  match, RouteComponentProps } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import yellow from '@material-ui/core/colors/deepOrange';
import TransactionDetail from './components/TransactionDetail';
import AddressDetail from './components/AddressDetail'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f0b90b'
    },
    type: 'dark'
  }
});


const styles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },  
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
}))

const App: React.FC = () => {
  const classes = styles();
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>

          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar} style={{padding: '0px 30px'}}>
              <Link variant="button" href="/">
              <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                LibraBlock
              </Typography>
              </Link>
              <nav>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Home
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                LibraChina
                </Link>
              </nav>
            </Toolbar>
          </AppBar>

          <Box  style={{marginTop: '5px'}}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField id="filled-full-width" label="Label" placeholder="请输入地址或交易id"
                fullWidth margin="normal" variant="filled" InputLabelProps={{shrink: true,}} />
            </form>
          </Box>

          <Route exact path="/" component={Index} />
          <Route path="/version/:id" component={TransactionDetail} />
          <Route path="/address/:id" component={AddressDetail} />


          <Box height="100px" marginTop="20px">
            <Typography variant="body2" color="textSecondary" align="center">
              {'Built with ♥ by the '}
              <Link color="inherit" href="https://hashforests.com/">
              HashForests
              </Link>
              {' team.'}
            </Typography>
          </Box>


        </Container>

      </Router>
    </MuiThemeProvider>
  );
}

export default App;