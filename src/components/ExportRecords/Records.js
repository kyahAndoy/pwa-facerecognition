import React from 'react'
import * as Excel from "exceljs";
import * as FileSaver from 'file-saver'
import Button from '@mui/material/Button';
function Records() {

    const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const createExcel = new Excel.Workbook();  
    const worksheet = createExcel.addWorksheet("Sheet1");
    
    worksheet.columns = [
      {header: 'Student ID', key: 'id', width: 10},
      {header: 'Last Name', key: 'Lname', width: 32 },
      {header: 'Fist Name', key: 'Fname', width: 32}, 
      {header: 'Status', key: 'stat', width: 15,}
    ];
    
    worksheet.addRow({id: 1, Lname: 'Ortecio', Fname: 'Zandro Gene', stat:'Present'});
    worksheet.addRow({id: 2, Lname: 'Castillo', Fname: 'Janet', stat: 'Present' });
    worksheet.addRow({id: 3, Lname: 'Canales', Fname: 'Clares',  stat:'Present'});
  
    async function writeExcel() {
      
      createExcel.xlsx.writeBuffer().then(data => {
        console.log(this)
        const blob = new Blob([data], { type: blobType });
        FileSaver.saveAs(blob, 'Student Attendance');
    }).catch(err => {
      console.log(err)
      })
      
    }
  
  return (
    <div>
      <Button variant='contained' onClick={() => writeExcel()}>Click</Button>
    </div>
  )
}

export default Records;