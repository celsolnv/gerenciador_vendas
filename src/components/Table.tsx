import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({headers,data}) {

  const Row = ( {record} )=>{
    const keys = Object.keys(record);

    return(
        <TableRow key={record.id}>
             {keys.map(key =><TableCell key={key}> {record[key]} </TableCell>) } 
        </TableRow>
    )
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map( (header:string) => <TableCell key={header.toString()}> {header} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(record => <Row record={record} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
