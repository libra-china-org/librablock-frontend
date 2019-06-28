import React from 'react';
import Transaction from "../models/Transaction"
import { TableRow, TableCell, Link, TableHead, createStyles, makeStyles, withStyles, Typography } from '@material-ui/core';


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
            <TableCell>
                <Typography align="center"> <b> Version <br /> (TX ID) </b> </Typography>
            </TableCell>

            <TableCell>
                <Typography align="center"> <b> Expiration <br /> Date (UTC) </b></Typography>
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
    return (
        <StyledTableRow>
            <TableCell>
                <Typography align="center" variant="body2">
                    <Link href={`/version/${x.transcation.version}`}>{x.transcation.version} </Link> 
                </Typography>
            </TableCell> 
            
            <TableCell>
                <Typography align="center" variant="body2">{x.transcation.time}</Typography>
            </TableCell>
            
            <TableCell>
                <Typography align="center" variant="body2">{x.transcation.type == 'mint_transaction' ? '⛏️' : '💵'}</Typography>
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