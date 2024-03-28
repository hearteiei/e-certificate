import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import './All.css';
// import GenerateCertificate from './GenerateCertificate';
import { Modal, Button } from 'react-bootstrap';

const apiUrl = process.env.REACT_APP_API_URL;
const data = localStorage.getItem('User');
const account = JSON.parse(data);
function Createone() {

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  const issuerDate = formatDate(new Date().toLocaleDateString());
  const [formData, setFormData] = useState({
    course_name: '',
    student_name: '',
    endorser_name: '',
    begin_date: '',
    end_date: '',
    issue_date: ''
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const certinfo = {
      course: formData.course_name,
      name: formData.student_fname + " " + formData.student_lname,
      issuer: account.firstname + " " + account.lastname,
      mail: formData.email,
      endorser_name: formData.endorser_fname + " " + formData.endorser_lname,
      begin_date: formData.begin_date,
      end_date: formData.end_date,
      issue_date: issuerDate,
    };
    console.log(certinfo); // You can do whatever you need with the certinfo object

    const data = new URLSearchParams();
    data.append('channelid', 'mychannel');
    data.append('chaincodeid', 'basic');
    data.append('function', 'createAsset');
    // data.append('args', "asset1293231429");
    data.append('args', certinfo.name);
    data.append('args', certinfo.endorser_name);
    data.append('args', certinfo.mail);
    data.append('args', certinfo.course);
    data.append('args', certinfo.issuer);
    data.append('args', certinfo.issue_date);
    data.append('args', certinfo.begin_date);
    data.append('args', certinfo.end_date);
    data.append('args', "Success");

    // Make the API call using fetch
    fetch(`${apiUrl}/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API response:', data);
        // Handle API response if needed
        certinfo.transaction_id = data.transaction_id; // Assuming data is the JSON response
        console.log('Updated certinfo:', certinfo);
        // GenerateCertificate(certinfo);
        const requestData = {
          studentName: certinfo.name,
          course: certinfo.course,
          issuer: certinfo.issuer,
          endorserName: certinfo.endorser_name,
          beginDate: certinfo.begin_date,
          endDate: certinfo.end_date,
          mail: certinfo.mail,
          transaction: certinfo.transaction_id,
          IssuerDate:issuerDate
        };
        console.log(requestData)


        fetch(`${apiUrl}//generate-certificates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            showSuccessPopup();
            return response.json();

          })




      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle errors if needed
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const showSuccessPopup = () => {
    setShowSuccessModal(true);
  }

  const hideSuccessPopup = () => {
    window.location.reload();
    setShowSuccessModal(false);
  }


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
              <h1 className="h3 mb-0 text-gray-800">Create For One</h1>
            </div>

            <div className="col-xl-25 col-md-25 mb-9">
              <div className="card shadow custom-card-height">
                <div className="card-body">
                  <h5 className="card-title">กรุณากรอกข้อมูล</h5>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="course_name">Course Name</label>
                      <input type="text" className="form-control" id="course_name" name="course_name" placeholder="Enter course name" onChange={handleInputChange} required />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="student_fname">Student First Name</label>
                        <input type="text" className="form-control" id="student_fname" name="student_fname" placeholder="Enter student first name" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="student_lname">Student Last Name</label>
                        <input type="text" className="form-control" id="student_lname" name="student_lname" placeholder="Enter student last name" onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="endorser_fname">Endorser First Name</label>
                        <input type="text" className="form-control" id="endorser_fname" name="endorser_fname" placeholder="Enter endorser first name" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="endorser_lname">Endorser Last Name</label>
                        <input type="text" className="form-control" id="endorser_lname" name="endorser_lname" placeholder="Enter endorser last name" onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="endorser_name">Email</label>
                      <input type="email" className="form-control" id="endorser_name" name="email" placeholder="Enter endorser name" onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="begin_date">Begin date(optional)</label>
                      <input type="date" className="form-control" id="begin_date" name="begin_date" placeholder="Enter begin date" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="end_date">End date(optional)</label>
                      <input type="date" className="form-control" id="end_date" name="end_date" placeholder="Enter end date" onChange={handleInputChange} />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="location">Location(optional)</label>
                      <input type="text" className="form-control" id="location" name="location" placeholder="Enter location" onChange={handleInputChange} />
                    </div> */}

                    <button type="submit" className="btn btn-success">Create Certificate</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={hideSuccessPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Course created successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideSuccessPopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Createone;