import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Topbar from './Components/Topbar';


function Course() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [courseCounts, setCourseCounts] = useState({ success: 0, pending: 0 });

    const data = localStorage.getItem('User');
    const account = JSON.parse(data);
    // console.log(account);
    const issuer = account.firstname + " " + account.lastname;

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const encodedIssuer = encodeURIComponent(issuer);
                const url = `${apiUrl}/query?channelid=mychannel&chaincodeid=basic&function=GetDiplomasInfoByIssuer&args=${encodedIssuer}`;

           
                const response = await fetch(url);
                const text = await response.text();
    
                const data = JSON.parse(text.replace('Response: ', ''));

                const newData = data.map((row, index) => ({ ...row, id: index }));
     
                newData.sort((a, b) => new Date(a.issuerDate) - new Date(b.issuerDate));
                setCourses(newData);
                const successCount = newData.filter(course => course.status === 'Success').length;
                const pendingCount = newData.filter(course => course.status === 'Pending').length;
                setCourseCounts({ success: successCount, pending: pendingCount });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        
        fetchData();

  
        const interval = setInterval(fetchData, 1000);

        
        return () => clearInterval(interval);
    }, [issuer]);
    const handleCreateCourse = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setNewCourseName('');
        setShowModal(false);
    }

    const handleCourseNameChange = (e) => {
        setNewCourseName(e.target.value);
    }
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year - 543}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };
    const issuerDate = formatDate(new Date().toLocaleDateString());

    const handleSubmit = () => {

        const data = new URLSearchParams();
        data.append('channelid', 'mychannel');
        data.append('chaincodeid', 'basic');
        data.append('function', 'createAsset');
        // data.append('args', "asset1293231429");
        data.append('args', "");
        data.append('args', "");
        data.append('args', "");
        data.append('args', newCourseName);
        data.append('args', issuer);
        data.append('args', issuerDate);
        data.append('args', "");
        data.append('args', "");
        data.append('args', "Pending");

        fetch(`${apiUrl}/invoke`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('New course name:', newCourseName);
                setShowModal(false); 
                showSuccessPopup(); 
                setTimeout(() => {
                    window.location.reload(); 
                }, 1000);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });

    }

    const handleViewCourse = (courseName) => {

        const url = `/view?courseName=${encodeURIComponent(courseName)}&issuerDate=${encodeURIComponent(issuerDate)}`;
        window.location.href = url;

    }
    const handleImportCourse = (courseName) => {
        const url = `/createmany?courseName=${encodeURIComponent(courseName)}`;
        window.location.href = url;

    }

    const showSuccessPopup = () => {
        setShowSuccessModal(true);
    }

    const hideSuccessPopup = () => {
        setShowSuccessModal(false);
    }
    localStorage.setItem('SuccessC', courseCounts.success);
    localStorage.setItem('PendingC', courseCounts.pending);
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Topbar */}
                    <Topbar />
                    {}
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Your Course</h1>
                            <button type="button" className="btn btn-success" onClick={handleCreateCourse}>Create New Course</button>
                        </div>

                        <div className="col-xl-25 col-md-25 mb-9">
                            <div className="card shadow custom-card-height">
                                <div className="card-body">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Issue Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.map((course, index) => (
                                                <tr key={index}>
                                                    <td>{course.course}</td>
                                                    <td>{course.issuerDate}</td>
                                                    <td>{course.status}</td>
                                                    <td>
                                                        {course.status === 'Success' ? (
                                                            <Button variant="primary" onClick={() => handleViewCourse(course.course, course.issuerDate)}>View</Button>
                                                        ) : (
                                                            <Button variant="secondary" onClick={() => handleImportCourse(course.course)}>Import</Button>
                                                        )}
                                                    </td>
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
            {}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter course name" value={newCourseName} onChange={handleCourseNameChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={hideSuccessPopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Course created successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={hideSuccessPopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Course;