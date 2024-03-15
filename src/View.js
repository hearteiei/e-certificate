import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Topbar from './Components/Topbar';
function View() {
  const [students, setstudents] = useState([]);

  const data = localStorage.getItem('User');
    const account = JSON.parse(data);
    // console.log(account);
    const issuer = account.firstname + " " + account.lastname;

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Encode the issuer name to ensure URL safety
            const queryParams = new URLSearchParams(window.location.search);
            const courseName = queryParams.get('courseName');
            const issuerDate = queryParams.get('issuerDate');
            const encodedIssuer = encodeURIComponent(issuer);
            const encodedate = encodeURIComponent(issuerDate);
            const encodecourse = encodeURIComponent(courseName);

            // http://localhost:8000/query?channelid=mychannel&chaincodeid=basic&function=Getstudent&args=${encodecourse}&args=${encodedIssuer}&args=${encodedate}
            const url = `http://localhost:8000/query?channelid=mychannel&chaincodeid=basic&function=Getstudent&args=${encodecourse}&args=${encodedIssuer}&args=${encodedate}`;

            // Fetch data from your API
            const response = await fetch(url);
            const text = await response.text();
            // Remove the leading "Response: " text
            const data = JSON.parse(text.replace('Response: ', ''));
            // Add a unique identifier to each row of data
            const newData = data.map((row, index) => ({ ...row, id: index }));
            // Sort data by issuerDate
            newData.sort((a, b) => new Date(a.issuerDate) - new Date(b.issuerDate));
            setstudents(newData);
            // const successCount = newData.filter(course => course.status === 'Success').length;
            // const pendingCount = newData.filter(course => course.status === 'Pending').length;
            // setCourseCounts({ success: successCount, pending: pendingCount });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Call fetchData initially
    fetchData();

    // Call fetchData every 1 second
    const interval = setInterval(fetchData, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
}, [issuer]);
    // const students = [
    //     {  name: 'kontakan' },
    //     { name: 'kunain' },
    //     { name: 'peeranut'},
    //   ];
    

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Topbar */}
          <Topbar />
          {/* Your other content goes here */}
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Your Course</h1>
              <button type="submit" className="btn btn-success">Create New Course</button>
            </div>

            <div className="col-xl-25 col-md-25 mb-9">
              <div className="card shadow custom-card-height">
                <div className="card-body">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id}>
                          <td>{student.studentName}</td>
                          <td>download</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View