import React from 'react'
import Sidebar from './Components/Sidebar'
import Topbar from './Components/Topbar'
import './All.css'

function Newcourse() {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Topbar */}
          <Topbar />
          {}
          <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">New Course</h1>
            </div>

            <div class="col-xl-25 col-md-25 mb-9">
              <div class="card shadow custom-card-height">
                <div class="card-body">
                  <h5 class="card-title">กรุณากรอกข้อมูล</h5>
                  <form action="Createmany">
                    <div class="form-group">
                      <label for="course_name">Course Name</label>
                      <input type="text" class="form-control" id="course_name" name="course_name" placeholder="Enter course name" />
                    </div>
                    <button type="submit" class="btn btn-success" href="Createmany" >Confirm</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newcourse