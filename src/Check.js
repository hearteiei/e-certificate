import React from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

function Check() {
  const certificateData = {
    studentName: "John Doe",
    course: "Introduction to Programming",
    issuer: "ABC University",
    endorserName: "Jane Smith",
    beginDate: "2022-01-01",
    endDate: "2022-05-01",
    mail: "uncles1512@gmail.com"
  };


  const queryString = Object.keys(certificateData)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(certificateData[key]))
    .join('&');

  const qrLink = `http://localhost:3000/fetch?${queryString}`;

  return (
    <div>
      <h1>Check</h1>
      <QRCode value={qrLink} onClick={generatePDF} />
    </div>
  );
}

export default Check;
