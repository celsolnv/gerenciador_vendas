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
import Link from './Link';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    textAlign:'center',
  },
  title:{
    textAlign:'center',
  },
  icon:{
    padding:'1rem',
  }
});

export default function BasicTable({headers,data,title,hasActions}) {
  const classes = useStyles();
  const Row = ( {record} )=>{
    const keys = Object.keys(record);
    return(
        <TableRow>
             {keys.map(field =><TableCell align="center" key={record.id+field}> {record[field]} </TableCell>) } 
             {hasActions ? 
               <TableCell align="center">
                  
                   {/* @ts-ignore */}
                    <Link className={classes.icon} href={`/editOrder?id=${record.id}`}>
                      <EditIcon  />
                    </Link>
                  
                  {/* @ts-ignore */}
                  <Link className={classes.icon} href={`/delOrder?id=${record.id}`}>
                    <DeleteIcon  />
                  </Link>
               </TableCell>
               :
               null
            }
        </TableRow>
    )
  }


  return (
    <TableContainer component={Paper}>
      <Typography className={classes.title} variant="h4"> {title} </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map( (header:string) => <TableCell align="center" key={header.toString()}> {header} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(record => <Row key={record.id} record={record} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
