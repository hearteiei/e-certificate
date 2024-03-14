import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import Excelgenerate from './Excelgenerate';

const data = localStorage.getItem('User');
const account = JSON.parse(data);

function Createmany() {
  const [formData, setFormData] = useState({
    course_name: '',
    student_name: '',
    endorser_name: '',
    email: '',
    begin_date: '',
    end_date: '',
    location: ''
  });

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const issuerDate = formatDate(new Date().toLocaleDateString());

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const queryParams = new URLSearchParams(window.location.search);
  const course = queryParams.get('courseName');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const cert = {
      course: course,
      issuer: account.firstname + " " + account.lastname,
      endorser_name: formData.endorser_name,
      begin_date: formData.begin_date,
      end_date: formData.end_date,
      issue_date: issuerDate,
    };
    let name = course+'certData';

    localStorage.setItem('certData', JSON.stringify(cert));

    // Redirect to export page
    window.location.href = '/export';
    console.log(cert);
    // Here you can add further logic to handle the certificate creation
  };

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
              <h1 className="h3 mb-0 text-gray-800">Import</h1>
            </div>

            <div className="col-xl-25 col-md-25 mb-9">
              <div className="card shadow custom-card-height">
                <div className="card-body">
                  <h5 className="card-title">กรุณากรอกข้อมูล</h5>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="endorser_name">Endorser Name</label>
                      <input type="text" className="form-control" id="endorser_name" name="endorser_name" placeholder="Enter endorser name" onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="begin_date">Begin date(optional)</label>
                      <input type="date" className="form-control" id="begin_date" name="begin_date" placeholder="Enter begin date" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="end_date">End date(optional)</label>
                      <input type="date" className="form-control" id="end_date" name="end_date" placeholder="Enter end date" onChange={handleInputChange} />
                    </div>
                    {/* You can add more form inputs here */}
                    <button type="submit" className="btn btn-success">Next </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createmany;
