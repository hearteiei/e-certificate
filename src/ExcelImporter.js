import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import { Table, Modal, Form } from 'react-bootstrap';
import GenerateCertificates from './GenerateCertificates'; // Import the GenerateCertificates component

class ExcelImporter extends React.Component {

    state = {
        importedData: [],
        showSuccessModal: false,
        loading: false// State to store imported data
    };


    componentDidMount() {
        // Retrieve data from localStorage
        const storedCertData = localStorage.getItem('certData');
        if (storedCertData) {
            const certinfo = JSON.parse(storedCertData);
            if (certinfo && certinfo.course) {
                this.setState({ importedData: certinfo.importedData, course: certinfo.course });
            }
            // console.log(certinfo)
        }
    }

    handleFileUpload = (event) => {
        const storedCertData = localStorage.getItem('certData');
        const certinfo = JSON.parse(storedCertData);
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


            let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Extract headers from first row
            const headers = jsonData[0];

            // Filter out header row
            jsonData = jsonData.slice(1);

            // Combine first and last name to create student name
            // jsonData = jsonData.map(row => {
            //     const student_fname = row[headers.indexOf('student_fname')];
            //     const student_lname = row[headers.indexOf('student_lname')];
            //     const student_Name = `${student_fname} ${student_lname}`;
            //     return { ...row, student_Name };
            // });


            // Add default course value to each object
            jsonData = jsonData.map(item => ({ ...item, course: certinfo.course }));
            jsonData = jsonData.map(item => ({ ...item, issuer: certinfo.issuer }));
            jsonData = jsonData.map(item => ({ ...item, begin_date: certinfo.begin_date }));
            jsonData = jsonData.map(item => ({ ...item, end_date: certinfo.end_date }));
            jsonData = jsonData.map(item => ({ ...item, endorser_name: certinfo.endorser_name }));

            // Update state with imported data
            this.setState({ importedData: jsonData });
        };

        reader.readAsArrayBuffer(file);
    };


    handleGenerateCertificates = async () => {
        const { importedData } = this.state;

        this.setState({ loading: true });

        const sendData = async (data, requestData) => {
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
                    console.log(data)
                }
                const responseData = await response.json();
                console.log('Response:', responseData);
                // console.log(responseData.transaction_id);
                

                requestData['transaction']=responseData.transaction_id;
                console.log(requestData)


                


                fetch('http://localhost:8000/generate-certificates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => {
                        //   if (!response.ok) {
                        //     throw new Error('Network response was not ok');
                        //   }
                        //   return response.json();
                        this.setState({ showSuccessModal: true });
                        this.setState({ loading: false });
                    })




                // this.setState({ showSuccessModal: true });
                // Handle response data if needed
            } catch (error) {
                console.error('Error:', error);
                // Handle errors
            }
        };

        console.log(importedData);
        const formatDate = (dateString) => {
            const [day, month, year] = dateString.split("/");
            return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };
        const issuerDate = formatDate(new Date().toLocaleDateString());
        for (const data of importedData) {
            const Fname = data[0];
            const lname = data[1];
            const mail = data[2]
            // console.log(Fname + " " + lname)
            // console.log(mail)

            const req = {
                studentName: Fname + " " + lname,
                course: data.course,
                issuer: data.issuer,
                endorserName: data.endorser_name,
                beginDate: data.begin_date,
                endDate: data.end_date,
                mail: mail,
                transaction:'',
                issuerDate:issuerDate
            };





            console.log(data);
            const dataput = new URLSearchParams();
            dataput.append('channelid', 'mychannel');
            dataput.append('chaincodeid', 'basic');
            dataput.append('function', 'createAsset');
            dataput.append('args', Fname + " " + lname);
            dataput.append('args', data.endorser_name);
            dataput.append('args', mail);
            dataput.append('args', data.course);
            dataput.append('args', data.issuer)
            dataput.append('args', issuerDate);
            dataput.append('args', data.begin_date);
            dataput.append('args', data.end_date);
            dataput.append('args', "Success");
            console.log(dataput);
            await sendData(dataput, req); // Wait for sendData to complete
        }

        // GenerateCertificates(importedData); // Call GenerateCertificates with imported data
    };
    hideSuccessModal = () => {
        this.setState({ showSuccessModal: false });
        window.location.href = "/course";
        // Hide success modal
    };

    render() {
        const { showSuccessModal, loading } = this.state;

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

                {loading && <div>Loading...</div>}

                <Modal show={showSuccessModal} onHide={this.hideSuccessModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Data has been successfully posted.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideSuccessModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ExcelImporter;
