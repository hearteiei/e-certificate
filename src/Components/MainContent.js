import React from 'react';
import '../All.css';

function MainContent() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Retrieve form data
    const formData = new FormData(event.target);

    // Access form fields by name
    const courseName = formData.get('course_name');
    const studentName = formData.get('student_name');
    const endorserName = formData.get('endorser_name');

    const formatDate = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };
    const issuerDate = formatDate(new Date().toLocaleDateString());
    const issuer = account.firstname + " " + account.lastname;
    try {
      const requestData = {
        studentName: studentName,
        course: courseName,
        issuer: issuer, // Define issuers or remove it if not needed
        endorserName: endorserName,
        beginDate: "", // Define begin or remove it if not needed
        endDate: "", // Define end or remove it if not needed
        mail: "", // Define mail or remove it if not needed
        Transaction: "", // Define Transaction or remove it if not needed
        issuerDate: issuerDate
      };

      const response = await fetch('http://localhost:8000/dow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        // Convert the response to blob
        const blob = await response.blob();
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        // Create a link and simulate a click to trigger download
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

    // Reset the form if needed
    event.target.reset();
  };

  const s = localStorage.getItem('SuccessC');
  const p = localStorage.getItem('PendingC');
  const data = localStorage.getItem('User');
  const account = JSON.parse(data);


return (
  <div className="container-fluid">
    {/* Page Heading */}
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">Welcome {account.firstname}!!! </h1>
    </div>

    {/* Content Row */}
    <div className="row">
      {/* Earnings (Monthly) Card Example */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Certificate Created</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{p}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings (Monthly) Card Example */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  this month created</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Card Example */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Pending Created</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{s}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Content Row */}
    <div className="row">
      {/* Area Chart */}
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Quick Create</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="chart-area">
                <div class="form-group">
                  <label htmlFor="course_name">Course Name</label>
                  <input type="text" class="form-control" id="course_name" name="course_name" placeholder="Enter course name" required/>
                </div>
                <div class="form-group">
                  <label htmlFor="student_name">Student Name</label>
                  <input type="text" class="form-control" id="student_name" name="student_name" placeholder="Enter student name" />
                </div>
                <div class="form-group">
                  <label htmlFor="endorser_name">Endorser Name</label>
                  <input type="text" class="form-control" id="endorser_name" name="endorser_name" placeholder="Enter endorser name" />
                </div>
                <button type="submit" className="btn btn-success">
                  <span className="text">Create Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Let's Advanced Create</h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Create for one people</label><br />
              <a className="nav-link" href="Createone">
                {/* <i className="fas fa-fw fa-chart-area"></i> */}
                <button className="btn btn-success" >Create for one</button>
              </a>

            </div>
            <div className="form-group">
              <label>Create for Many people using Excel</label><br />
              <a className="nav-link" href="Course">
                {/* <i className="fas fa-fw fa-chart-area"></i> */}
                <button className="btn btn-success" >Create for a Course</button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
);
}

export default MainContent;