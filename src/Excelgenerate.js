import React from 'react';
import * as XLSX from 'xlsx';

class Excelgenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: {
        'Endorser_Name': false,
        'Location': false,
        'Begin_Date': false,
        'End_date': false
      }
    };
  }

  handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    this.setState((prevState) => ({
      checkedItems: {
        ...prevState.checkedItems,
        [id]: checked
      }
    }));
  };

  generateExcel = () => {
    const { checkedItems } = this.state;

    // Default headers
    const defaultHeaders = ['student_Name', 'Email'];

    // Filter out only checked items
    const checkedHeaders = Object.keys(checkedItems).filter(
      (item) => checkedItems[item]
    );

    // Combine default headers with checked headers
    const allHeaders = [...defaultHeaders, ...checkedHeaders];

    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([allHeaders]);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'header.xlsx');
  };

  render() {
    return (
      <div>
        <a
          type="button"
          className="btn btn-success mt-3"
          onClick={this.generateExcel}
          href='importexcel'
        >
          Export To Excel
        </a>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="Endorser_Name"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="Endorser_Name">
            Endorser_Name
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="Location"
            onChange={this.handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="Location">
            Location
          </label>
        </div>
        <div className="form-check">
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
        </div>
      </div>
    );
  }
}

export default Excelgenerate;
