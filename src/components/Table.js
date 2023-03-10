import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ handleData, handleModal, data }) {
  // Pass data up to App.js to be able to communicate w/ Modal
  function handleRowClick(event, row) {
    handleModal(true);
    handleData(row);
  }

  return (
    // Provided by employers
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ borderBottom: '5px solid black', '& > th': { fontWeight: 'bold', fontSize: '18px' } }}>
            <TableCell align='left'>Opp Name</TableCell>
            <TableCell align='left'>Opp Stage</TableCell>
            <TableCell align='right'>Rep Probability</TableCell>
            <TableCell align='right'>PX Probability</TableCell>
            <TableCell align='left'>PX Tier</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='left'>Product</TableCell>
            <TableCell align='left'>Sales Rep</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              onClick={event => handleRowClick(event, row)}
              key={row.oppId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: 'rgb(230, 230, 250)',
                '&:nth-of-type(even)': { backgroundColor: '	rgb(224, 176, 255)' },
                '&:hover': { backgroundColor: 'rgb(204, 204, 255)', cursor: 'pointer' },
                transition: '.3s',
              }}>
              <TableCell component='th' scope='row'>
                {row.oppName}
              </TableCell>
              <TableCell align='left'>{row.stage}</TableCell>
              <TableCell align='right'>{row.repProbability}</TableCell>
              <TableCell align='right'>{row.pilytixProbability}</TableCell>
              <TableCell align='left'>{row.pilytixTier}</TableCell>
              <TableCell align='right'>${row.amount}</TableCell>
              <TableCell align='left'>{row.product}</TableCell>
              <TableCell align='left'>{row.salesRepName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
