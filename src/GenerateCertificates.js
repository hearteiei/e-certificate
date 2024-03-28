import React from 'react'
import jsPDF from 'jspdf'
import img from './img/template1.png'

const GenerateCertificates = (certinfos) => {
  certinfos.forEach(({ student_Name, course, issuer, Endorser_Name,Begin_Date,End_date}) => {

   
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [200, 300]
    });
    
    
    const imageWidth = doc.internal.pageSize.getWidth();
    const imageHeight = doc.internal.pageSize.getHeight();
    doc.addImage(img, 'PNG', 0, 0, imageWidth, imageHeight, '', 'FAST');

    
    doc.setFontSize(36);
    doc.setFont('helvetica');
    doc.text(student_Name, 145, 110, { align: 'center' }); 

    doc.setFontSize(20);
    doc.text(course, 145, 150, { align: 'center' }); 

    doc.setFontSize(15);
    doc.text(issuer, 88, 170, { align: 'center' }); 
    doc.setFontSize(15);
    doc.text(issuer, 88, 160, { align: 'center' }); 

    doc.setFontSize(15);
    doc.text(Endorser_Name, 208, 170, { align: 'center' }); 
    doc.setFontSize(15);
    doc.text(Endorser_Name, 208, 160, { align: 'center' }); 

    doc.save(`${student_Name}-${course}.pdf`);

    
  });
};

export default GenerateCertificates;
