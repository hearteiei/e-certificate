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

    handleGenerateCertificates = async () => {
        const { importedData } = this.state;
    
        const sendData = async (data) => {
            try {
                const response = await fetch('http://localhost:8000/invoke', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                console.log('Response:', responseData);
                // Handle response data if needed
            } catch (error) {
                console.error('Error:', error);
                // Handle errors
            }
        };
    
        console.log(importedData);
        for (const data of importedData) {
            console.log(data);
            const dataput = new URLSearchParams();
            dataput.append('channelid', 'mychannel');
            dataput.append('chaincodeid', 'basic');
            dataput.append('function', 'createAsset');
            dataput.append('args', data.student_Name);
            dataput.append('args', data.Endorser_Name);
            dataput.append('args', data.course);
            dataput.append('args', data.issuer);
            dataput.append('args', data.issue_date);
            dataput.append('args', data.begin_date);
            dataput.append('args', data.end_date);
            console.log(dataput);
            await sendData(dataput); // Wait for sendData to complete
        }
    
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
