import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import API from '../utils/api';
import Transaction from "../models/Transaction";
import {CustomTableRow, CustomTableHead} from "./CustomTable";
import LiveTps from './LiveTps';
import { TpsData, versionToLiveTPS } from '../utils/tps';

import { FormattedMessage } from 'react-intl';

const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

const styles = makeStyles(theme => ({
    summary_title: {
        margin: "10px"
      },
      flex_row: {
        display: "flex",
        flexDirection: "row"
      },
      flex_column: {
        display: "flex",
        flexDirection: "column"
      }
}))

const Index: React.FC = () => {
    const classes = styles();

    const [trancations, setTrancations] = useState<Transaction[]>([]);
  
    useEffect(() => {
        async function loadDataLoop() {
          while (true) {
            const txs = await API.fetchVersions(50);
            setTrancations(txs);
            await timeout(1000);
          }
        }
        loadDataLoop();
    }, trancations)
  
    return (
      <Box marginTop="40px">
        <Typography style={{marginBottom: 20}} color="primary" variant="h4" align="center">
          <FormattedMessage id="livetps"/>
        </Typography>
        <Box className={classes.flex_row}>
          {/* <Grid xs={4}>
            
            <Typography color="primary" variant="h5" align="center" className={classes.summary_title}>Summary</Typography>
            <Card>
              <Box className={classes.flex_row} marginTop="10px">
                <Grid xs={6} className={classes.flex_column}>
                  <Box marginLeft="10px" borderRight={1} borderColor={"primary.main"}>
                    <Typography style={{marginTop:"10px"}} align="center" variant="subtitle2">Address</Typography>
                    <Typography style={{marginBottom:"10px"}} align="center" color="primary" variant="h6"><b>23333</b></Typography>
                  </Box>
                </Grid>
                <Grid xs={6} className={classes.flex_column}>
                  <Box marginRight="10px">
                  <Typography style={{marginTop:"10px"}} align="center" variant="subtitle2">Trancations</Typography>
                  <Typography style={{marginBottom:"10px"}} align="center" color="primary" variant="h6"><b>23333</b></Typography>
                  </Box>
                </Grid>
              </Box>
  
              <Box className={classes.flex_row} marginBottom="10px">
                <Grid xs={6} className={classes.flex_column}>
                  <Box marginLeft="10px" borderTop={1} borderRight={1} borderColor={"primary.main"}>
                    <Typography style={{marginTop:"10px"}} align="center" variant="subtitle2">Mint Trans</Typography>
                    <Typography style={{marginBottom:"10px"}} align="center" color="primary" variant="h6"><b>23333</b></Typography>
                  </Box>
                </Grid>
                <Grid xs={6} className={classes.flex_column}>
                  <Box marginRight="10px" borderTop={1} borderColor={"primary.main"}>
                    <Typography style={{marginTop:"10px"}} align="center" variant="subtitle2">P2P Trans</Typography>
                    <Typography style={{marginBottom:"10px"}} align="center" color="primary" variant="h6"><b>23333</b></Typography>
                  </Box>
                </Grid>
              </Box>
            </Card>
          </Grid> */}
  

          <Grid xs={12}>
            <Card>
              <LiveTps data={versionToLiveTPS(trancations)}></LiveTps>
            </Card>
          </Grid>
        </Box>
  
        <Box marginTop="40px">
          <Typography style={{marginTop:"20px",marginBottom:"20px"}} color="primary" variant="h4" align="center">
            <FormattedMessage id="latestTx"/>
          </Typography>

          <Card>
            <Box>
              <Table>
                <CustomTableHead/>
  
                <TableBody>
                  {trancations.slice(0, 20).map(row => (
                    <CustomTableRow transcation={row} key={row.version}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
      </Box>
    )
  }
  export default Index;