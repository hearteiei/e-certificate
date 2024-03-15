import React from 'react';
import '../All.css';

function MainContent() {
  const s = localStorage.getItem('SuccessC');
  const p = localStorage.getItem('PendingC');
  const data = localStorage.getItem('User');
    const account = JSON.parse(data);
    // console.log(account);
    const issuer = account.firstname + " " + account.lastname;
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
              <div className="chart-area">
                <div class="form-group">
                  <label for="course_name">Course Name</label>
                  <input type="text" class="form-control" id="course_name" name="course_name"
                    placeholder="Enter course name" />
                </div>
                <div class="form-group">
                  <label for="student_name">Student Name</label>
                  <input type="text" class="form-control" id="student_name" name="student_name" placeholder="Enter student name" />
                </div>
                <div class="form-group">
                  <label for="student_name">Endorser Name</label>
                  <input type="text" class="form-control" id="student_name" name="endorser_name" placeholder="Enter endorser name" />
                </div>
                <a href="#" class="btn btn-success">
                <span class="text">Create Certificate</span>
              </a>
              </div>
  
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
                <button className="btn btn-success">Create for one</button>
              </div>
              <div className="form-group">
                <label>Create for Many people using Excel</label><br />
                <button className="btn btn-success">Create for a Course</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;