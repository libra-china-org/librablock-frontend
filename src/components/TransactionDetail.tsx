import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Link } from '@material-ui/core';
import { RouteComponentProps } from "react-router-dom";
import Transcation from "../models/Transaction"
import API from '../utils/api';

interface Identifiable {id: string; }

const TransactionDetail: React.SFC<RouteComponentProps<Identifiable>> = ((props)=>{

    const [transaction, setTransaction] = useState<Transcation>(new Transcation({}))

    useEffect(() => {
        API.fetchVersion(parseInt(props.match.params.id)).then((x) => {
            setTransaction(x)
        })
    }, [])

    let arr = [
        ['version', props.match.params.id],
        ['Expiration Time', transaction.time],
        ['Source', (<Link href={`/address/${transaction.from}`}>{transaction.from}</Link>)],
        ['Destination', (<Link href={`/address/${transaction.to}`}>{transaction.to}</Link>)],
        ['Type', transaction.type],
        ['Amount Transferred', transaction.displayAmount()],
        ['Gas Price', transaction.gasPrice],
        ['Max Gas', transaction.maxGas],
        ['Sequence Number', transaction.sequence],
        ['Public Key', transaction.publicKey]
    ]

    return (
        <Container>
            <Box marginTop="20px">
                <Typography color="primary" variant="h4" align="center"> Details for Version / Transaction </Typography>
            </Box>

            <Box marginTop="20px">
            <Table>
                <TableBody>
                    {arr.map(x=>
                        (
                            <TableRow>
                                <TableCell>{x[0]}</TableCell>
                                <TableCell>{x[1]}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
            </Box>
        </Container>
    );
})

export default TransactionDetail