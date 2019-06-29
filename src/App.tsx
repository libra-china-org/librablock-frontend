import React from 'react';
import ReactGA from 'react-ga';
import Index from './components/Index'
import { BrowserRouter, Route, match, RouteComponentProps } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import TransactionDetail from './components/TransactionDetail';
import AddressDetail from './components/AddressDetail'

import ImgLogo from './assets/librablock.png';

ReactGA.initialize('UA-39767786-5');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(66, 49, 140)'
    },
    secondary: {
      main: '#1e4855'
    },
    type: 'light'
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
    },
    a: {
      textDecoration: 'none',
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
  toolbarLogoTitle: {
    position: 'relative',
    top: -16,
    fontSize: 20,
    marginLeft: 12
  },
  libraChinaButton : {
    boxShadow: 'none',
    marginLeft: 20,
    paddingLeft: 30,
    paddingRight: 30,
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
  let text: string
  const submit = (event: any)=>{
    event.preventDefault();

    let version = parseInt(text)
    if (isNaN(version)) {
      if (text.length == 64) {
        window.location.href = `/address/${text}`  
      } else {
        alert("Illegal address or tx version")
      }
    } else {
      window.location.href = `/version/${version}`
    }
  }

  const textfieldOnChanged = (event: any) => {
    text = event.target.value
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar} style={{padding: '0px 30px'}}>
              <Link className={classes.toolbarTitle} href="/" underline='none'>
                <img src={ImgLogo} style={{height: 50}} />
                <span className={classes.toolbarLogoTitle}>LibraBlock</span>
              </Link>
              <nav>
                <Link variant="button" color="primary" href="#" className={classes.link} underline='none'>
                Home
                </Link>
                <Fab variant="extended" color="primary" aria-label="Add" className={classes.libraChinaButton}>
                  LibraChina
                </Fab>
              </nav>
            </Toolbar>
          </AppBar>

          <Container>

            <Box  style={{marginTop: '5px'}}>
              <form className={classes.container} noValidate autoComplete="off" onSubmit={submit}>
                <TextField id="filled-full-width" label="Query" placeholder="Search by address or tx versio"
                  fullWidth margin="normal" variant="filled" InputLabelProps={{shrink: true,}} onChange={textfieldOnChanged}/>
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
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;