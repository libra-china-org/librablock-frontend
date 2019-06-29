import React from 'react';
import Transaction from "../models/Transaction"
import { TableRow, TableCell, Link, TableHead, createStyles, makeStyles, withStyles, Typography } from '@material-ui/core';
import { formatDateTime } from '../utils/format'

interface CustomTableRowProps {
    transcation: Transaction,
}

// const StyledTableHead = withStyles(theme => ({
//     root: {
//         te
//     //     background: theme.palette.grey[700],
//     //     '&:nth-of-type(odd)': {
//     //         backgroundColor: theme.palette.grey[600],
//     //     },
//     },
// }))(TableHead);


export const CustomTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography align="center"> <b> Version <br /> (Tx Height) </b> </Typography>
                </TableCell>

                <TableCell>
                    <Typography align="center"> <b> Expiration <br /> Date </b></Typography>
                </TableCell>

                <TableCell>
                    <Typography align="center"> <b>Type</b></Typography>
                </TableCell>

                <TableCell>
                    <Typography align="center"><b>From → To</b></Typography>
                </TableCell>
                <TableCell>
                    <Typography align="center"><b>Amount</b></Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

const StyledTableRow = withStyles(theme => ({
    // root: {
    //     background: theme.palette.grey[700],
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.grey[600],
    //     },
    // },
}))(TableRow);

export const CustomTableRow: React.SFC<CustomTableRowProps> = (x) => {
    const txDesc: {[name: string]: string} = {
        'peer_to_peer_transaction': 'Transfer',
        'create_account_transaction': 'NewAccount',
        'mint_transaction': 'Mint',
        'rotate_authentication_key_transaction': 'ChangeKey'
    };
    return (
        <StyledTableRow>
            <TableCell>
                <Typography align="center" variant="body2">
                    <Link href={`/version/${x.transcation.version}`}>{x.transcation.version} </Link> 
                </Typography>
            </TableCell> 
            
            <TableCell>
                <Typography align="center" variant="body2">{formatDateTime(x.transcation.time)}</Typography>
            </TableCell>
            
            <TableCell>
                <Typography align="center" variant="body2">{txDesc[x.transcation.type]}</Typography>
            </TableCell>
            
            <TableCell>
                <Typography variant="body2">
                    <Link href={`/address/${x.transcation.from}`}>{x.transcation.from} </Link> → <br />
                    <Link href={`/address/${x.transcation.to}`}>{x.transcation.to} </Link> 
                </Typography> 
            </TableCell>
                        
            <TableCell>
                <Typography  variant="body2">{x.transcation.displayAmount()}<br />Libra</Typography>
            </TableCell>

        </StyledTableRow>
    )
}