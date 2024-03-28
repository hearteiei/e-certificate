import React, { useState } from 'react';
import img from './img/cmu.png';

function OTP() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };
    const email = localStorage.getItem('Email');
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const requestData = {
            Mail: email,
            OTP: inputs.otp
        };
        console.log(requestData);
    
        fetch(`${apiUrl}/checkotp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           
            console.log('CheckOtp successful:', data);
            window.location.href = "/login";
        })
        .catch(error => {
           
            console.error('Checkotp failed:', error);
        });
    };

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {}
                    <div className="row">
                        <img className="col-lg-5 d-none d-lg-block " src={img} alt="Register img" />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">OTP</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="otpInput"
                                                placeholder="Enter OTP"
                                                name="otp"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Submit
                                    </button>
                                    <hr />
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTP;