import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Topbar from './Components/Topbar';

function Course() {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const data = localStorage.getItem('User');
    const account = JSON.parse(data);
    // console.log(account);
    const issuer = account.firstname + " " + account.lastname;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Encode the issuer name to ensure URL safety
                const encodedIssuer = encodeURIComponent(issuer);
                const url = `http://localhost:8000/query?channelid=mychannel&chaincodeid=basic&function=GetDiplomasInfoByIssuer&args=${encodedIssuer}`;

                // Fetch data from your API
                const response = await fetch(url);
                const text = await response.text();
                // Remove the leading "Response: " text
                const data = JSON.parse(text.replace('Response: ', ''));
                // Add a unique identifier to each row of data
                const newData = data.map((row, index) => ({ ...row, id: index }));
                // Sort data by issuerDate
                newData.sort((a, b) => new Date(a.issuerDate) - new Date(b.issuerDate));
                setCourses(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData initially
        fetchData();

        // Call fetchData every 1 second
        const interval = setInterval(fetchData, 1000);

        // Clean up interval when component unmounts
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

        fetch('http://localhost:8000/invoke', {
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
                setShowModal(false); // Close the modal
                showSuccessPopup(); // Show the success pop-up
                setTimeout(() => {
                    window.location.reload(); // Reload the page after 1 second
                }, 1000);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });

    }

    const handleViewCourse = (courseName) => {
        const url = `/view?courseName=${encodeURIComponent(courseName)}`;
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
                                                            <Button variant="primary" onClick={() => handleViewCourse(course.course)}>View</Button>
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
            {/* Modal for creating new course */}
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