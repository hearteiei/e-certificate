import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Fetch() {
  const location = useLocation();
  const [pdfUrl, setPdfUrl] = useState(null);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const studentName = searchParams.get('studentName');
    const course = searchParams.get('course');
    const issuer = searchParams.get('issuer');
    const endorserName = searchParams.get('endorserName');
    const beginDate = searchParams.get('beginDate');
    const endDate = searchParams.get('endDate');
    const mail = searchParams.get('mail');

    const postData = {
      studentName,
      course,
      issuer,
      endorserName,
      beginDate,
      endDate,
      mail
    };
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/gen`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });

       
        if (!response.ok) {
            throw new Error('Failed to fetch PDF');
          }
    
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        } catch (error) {
          console.error('Error fetching PDF:', error);
        }
      };

    fetchData();
  }, [location.search]);

  return (
    <div>
      {/* <button onClick={fe}>Fetch PDF</button> */}
      {pdfUrl && (
        <iframe
          title="certificate"
          src={pdfUrl}
          style={{ width: '100%', height: '1000px' }}
        />
      )}
    </div>
  );
}

export default Fetch;
