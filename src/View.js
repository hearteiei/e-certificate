import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Topbar from './Components/Topbar';
function View() {
  const [students, setstudents] = useState([]);

  const data = localStorage.getItem('User');
  const account = JSON.parse(data);
  const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(account);
  const issuers = account.firstname + " " + account.lastname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const queryParams = new URLSearchParams(window.location.search);
        const courseName = queryParams.get('courseName');
        const issuerDate = queryParams.get('issuerDate');
        const encodedIssuer = encodeURIComponent(issuers);
        const encodedate = encodeURIComponent(issuerDate);
        const encodecourse = encodeURIComponent(courseName);

        // http://localhost:8000/query?channelid=mychannel&chaincodeid=basic&function=Getstudent&args=${encodecourse}&args=${encodedIssuer}&args=${encodedate}
        const url = `${apiUrl}/query?channelid=mychannel&chaincodeid=basic&function=Getstudent&args=${encodecourse}&args=${encodedIssuer}&args=${encodedate}`;

        
        const response = await fetch(url);
        const text = await response.text();
       
        const data = JSON.parse(text.replace('Response: ', ''));
       
        const newData = data.map((row, index) => ({ ...row, id: index }));
       
        newData.sort((a, b) => new Date(a.issuerDate) - new Date(b.issuerDate));
        setstudents(newData);
        // const successCount = newData.filter(course => course.status === 'Success').length;
        // const pendingCount = newData.filter(course => course.status === 'Pending').length;
        // setCourseCounts({ success: successCount, pending: pendingCount });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    fetchData();

    
    const interval = setInterval(fetchData, 1000);

    
    return () => clearInterval(interval);
  }, [issuers]);
  const handleDownload = async (courseName, issuerDate,name,en_name,begin,end,mail) => {
    try {
      const requestData = {
        // Mail: inputs.email,
        // password: inputs.password,
        studentName: name,
        course: courseName,
        issuer: issuers,
        endorserName: en_name,
        beginDate: begin,
        endDate: end,
        mail   : mail,
        Transaction: "",
        issuerDate:issuerDate
    };
    const response = await fetch(`${apiUrl}/dow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
      //   .then(response => {
      //       if (!response.ok) {
      //           throw new Error('Network response was not ok');
      //       }
      //       return response.json();
      //   })
      // const encodedIssuer = encodeURIComponent(issuers);
      // const encodedate = encodeURIComponent(issuerDate);
      // const encodecourse = encodeURIComponent(courseName);

      
      // const response = await fetch(`http://localhost:8000/downloadCertificate?courseName=${encodecourse}&issuerDate=${encodedate}&issuer=${encodedIssuer}`);

      
      if (response.ok) {
        
        const blob = await response.blob();
       
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download certificate');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };


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
          {}
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Your Course</h1>
              {/* <button type="submit" className="btn btn-success">Create New Course</button> */}
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
                          <button 
                              type="button" 
                              className="btn btn-success" 
                              onClick={() => handleDownload(student.ourse, student.issuedDate,student.studentName,student.endorser_name,student.Begin_date,student.End_date,student.Mail)}
                            >
                              Download
                            </button>

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