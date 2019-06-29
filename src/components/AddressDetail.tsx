
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Container, Typography, Table, TableBody, TableRow, TableCell, Box, TableHead, Link } from '@material-ui/core';
import Account from "../models/Account"
import Transaction from "../models/Transaction"
import API from "../utils/api"
import qs from "querystring"
import {CustomTableRow, CustomTableHead} from "./CustomTable"

interface Identifiable {id: string; }
const AddressDetail: React.SFC<RouteComponentProps<Identifiable>> = ((props) => {
    
    const [account, setAccount] = useState<Account>(new Account({}))
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const query = qs.parse(props.location.search)
    const offset = parseInt(query['?offset'] as string) || parseInt(query['offset'] as string) || 0 
    const limit = 20

    useEffect(()=>{
        (async function(){
            let acc = await API.fetchAddressDetail(props.match.params.id)
            let trans = await API.fetchVersions(limit, offset, props.match.params.id)

            setAccount(acc)
            setTransactions(trans)
        })()
    }, [])
    return (
        <Container>
            <Box>
                <Typography variant="h4" align="center" color="primary">Details for Account</Typography>
                <Box marginTop="20px">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{props.match.params.id}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>AuthenticationKey</TableCell>
                            <TableCell>{account.authenticationKey}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Balance</TableCell>
                            <TableCell>{account.balance*1.0/1000000} Libra</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Sequence Number</TableCell>
                            <TableCell>{account.sequenceNumber}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Sent Event Count</TableCell>
                            <TableCell>{account.sentEventCount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Received Event Count</TableCell>
                            <TableCell>{account.receivedEventCount}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                </Box>
            </Box>

            <Box marginTop="20px">
                <Typography variant="h4" color="primary" align="center">Transactions</Typography>
                <Typography align="center">Latest transactions</Typography>

                <Box>
                    <Table>
                        
                        <CustomTableHead/>
                        <TableBody>
                            {transactions.map(x=>(
                                <CustomTableRow transcation={x}></CustomTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Container>
    )
})

export default AddressDetail