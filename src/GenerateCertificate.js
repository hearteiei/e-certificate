import React from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'; 
import img from './img/template1.png';

const GenerateCertificate = ({ name, course, issuer, endorser_name, begin_date, end_date, transaction_id }) => {
   
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
    doc.text(name, 145, 110, { align: 'center' });

    if (begin_date !== '' || end_date !== '') {
        doc.setFontSize(18);
        doc.setFont('helvetica');
        doc.text("Begin_Date: " + begin_date, 95, 195, { align: 'center' });

        doc.setFontSize(18);
        doc.setFont('helvetica');
        doc.text("End_Date: " + end_date, 170, 195, { align: 'center' });


    }

    
    // doc.setFontSize(18);
    // doc.setFont('helvetica');
    // doc.text("Begin_Date: " + begin_date, 95, 195, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica');
    doc.text("Transaction_id: " + transaction_id, 95, 10, { align: 'center' });


    // doc.setFontSize(18);
    // doc.setFont('helvetica');
    // doc.text("End_Date: " + end_date, 170, 195, { align: 'center' });


    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };
    const issuerDate = formatDate(new Date().toLocaleDateString());
    doc.setFontSize(18);
    doc.setFont('helvetica');
    doc.text("Issuer Date: " + issuerDate, 170, 188, { align: 'center' });

   
    doc.setFontSize(20);
    doc.text(course, 145, 150, { align: 'center' });

   
    doc.setFontSize(15);
    doc.text(issuer, 88, 170, { align: 'center' });
    doc.text(endorser_name, 208, 170, { align: 'center' });

   
    const qrCodeData = `${name}-${course}`;
    QRCode.toDataURL(qrCodeData, (err, url) => {
        if (err) throw err;

       
        const imgData = url;
        doc.addImage(imgData, 'PNG', imageWidth - 60, 10, 50, 50); 

       
        doc.save(`${name}-${course}.pdf`);
    });
};

export default GenerateCertificate;