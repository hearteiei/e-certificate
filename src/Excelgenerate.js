import React from 'react';
import * as XLSX from 'xlsx';

class Excelgenerate extends React.Component {
  
  
  

  generateExcel = () => {
    const { certData } = this.props;
    

    // Default headers
    const defaultHeaders = ['student_fName','student_LName', 'Email'];

    



    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([defaultHeaders]);



    // Create a new workbook
    const wb = XLSX.utils.book_new();

  

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'header.xlsx');

    localStorage.setItem('certData', JSON.stringify(certData));

    // Redirect to importexcel page
    window.location.href = 'importexcel';
  };

  render() {
    // const { certData } = this.props;
    // console.log(certData);
    
    return (
      <div>
        <a
          type="button"
          className="btn btn-success mt-3"
          onClick={this.generateExcel}
          // href='importexcel'
        >
          Export To Excel
        </a>
        {/* <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="Endorser_Name"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="Endorser_Name">
            Endorser_Name
          </label>
        </div> */}
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="Location"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="Location">
            Location
          </label>
        </div> */}
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="Begin_Date"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="Begin_Date">
            Begin_Date
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="End_date"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="End_date">
            End_date
          </label>
        </div> */}
      </div>
    );
  }
}

export default Excelgenerate;
