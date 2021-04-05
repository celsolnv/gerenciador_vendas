import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { allOrders } from '../interfaces/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title:{
    textAlign:'center',
  }
});

export default function BasicTable({headers,data,title,hasActions}) {

  const Row = ( {record} )=>{
    const keys = Object.keys(record);
    return(
        <TableRow>
             {keys.map(field =><TableCell key={record.id+field}> {record[field]} </TableCell>) } 
             {hasActions ? 
               <TableCell>
                  {<EditIcon/>}
                  {<DeleteIcon/>}
               </TableCell>
               :
               null
            }
        </TableRow>
    )
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Typography className={classes.title} variant="h4"> {title} </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map( (header:string) => <TableCell key={header.toString()}> {header} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(record => <Row key={record.id} record={record} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
