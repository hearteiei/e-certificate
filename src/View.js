import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Topbar from './Components/Topbar';
function View() {
    const students = [
        {  name: 'kontakan' },
        { name: 'kunain' },
        { name: 'peeranut'},
      ];
    

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
                          <td>{student.name}</td>
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