import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import Excelgenerate from './Excelgenerate';
function Export() {

    const [certData, setCertData] = useState(null);

  useEffect(() => {
    // Retrieve cert data from localStorage
    const storedCertData = localStorage.getItem('certData');
    if (storedCertData) {
      setCertData(JSON.parse(storedCertData));
      // Optionally, clear the certData from localStorage after retrieving
    //   localStorage.removeItem('certData');
    }
    
  }, []);
  console.log(certData);
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
                <Excelgenerate certData={certData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Export