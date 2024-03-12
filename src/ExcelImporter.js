import React from 'react';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import GenerateCertificates from './GenerateCertificates'; // Import the GenerateCertificates component

class ExcelImporter extends React.Component {
    state = {
        importedData: [] // State to store imported data
    };

    handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming there's only one sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to array of objects
            let jsonData = XLSX.utils.sheet_to_json(sheet);

            // Add default course value to each object
            jsonData = jsonData.map(item => ({ ...item, course: 'swim' }));
            jsonData = jsonData.map(item => ({ ...item, issuer: 'Heart' }));

            // Update state with imported data
            this.setState({ importedData: jsonData });
        };

        reader.readAsArrayBuffer(file);
    };

    handleGenerateCertificates = () => {

        const { importedData } = this.state;
        console.log(importedData)
        GenerateCertificates(importedData); // Call GenerateCertificates with imported data
    };

    render() {
        return (
            <div>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={this.handleFileUpload}
                />
                <Button variant="contained" color="success" onClick={this.handleGenerateCertificates}>
                    Generate
                </Button>
            </div>
        );
    }
}

export default ExcelImporter;
