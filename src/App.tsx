import React from 'react';
import ReactGA from 'react-ga';
import Index from './components/Index'
import { BrowserRouter, Route, match, RouteComponentProps } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import TransactionDetail from './components/TransactionDetail';
import AddressDetail from './components/AddressDetail'

import SearchIcon from '@material-ui/icons/Search';
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
    height: 70,
    padding: '0px 30px'
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
  search: {
    position: 'relative',
    borderBottom: 'solid rgb(66, 49, 140) 2px',
    marginRight: 40,
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 160,
      '&:focus': {
        width: 260,
      },
    },
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
            <Toolbar className={classes.toolbar}>
              <Link component={RouterLink} className={classes.toolbarTitle} to="/" underline='none'>
                <img src={ImgLogo} style={{height: 50}} />
                <span className={classes.toolbarLogoTitle}>LibraBlock</span>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={submit}>
                  <InputBase
                    placeholder="Account, tx version…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                    onChange={textfieldOnChanged}
                  />
                </form>
              </div>
              <nav>
                <Link component={RouterLink} variant="button" color="primary" to="/" className={classes.link} underline='none'>
                  Home
                </Link>
                <Fab variant="extended" color="primary" aria-label="Add" className={classes.libraChinaButton} href="https://libra-china.org">
                  LibraChina
                </Fab>
              </nav>
            </Toolbar>
          </AppBar>

          <Container style={{marginTop: 40}}>

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