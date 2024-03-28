import React, { useState } from 'react';
import img from './img/cmu.png';

function Register() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const requestData = {
            Firstname: inputs.FirstName,
            Lastname: inputs.LastName,
            Mail: inputs.Mail,
            Password: inputs.Password
        };
        console.log(requestData);
    
        fetch(`${apiUrl}/register`, {
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
          
            console.log('Registration successful:', data);
            localStorage.setItem('Email', inputs.Mail);
            localStorage.setItem('register', "Success");
            window.location.href = "/otp";
        })
        .catch(error => {
            
            console.error('Registration failed:', error);
        });
    };
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {}
                    <div className="row">
                        <img className="col-lg-5 d-none d-lg-block " src={img} alt="Register img" />
                        {/* <div className="col-lg-5 d-none d-lg-block bg-register-image"></div> */}
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleFirstName"
                                                placeholder="First Name"
                                                name="FirstName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleLastName"
                                                placeholder="Last Name"
                                                name="LastName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="exampleInputEmail"
                                            placeholder="Email Address"
                                            name="Mail"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="exampleInputPassword"
                                                placeholder="Password"
                                                name="Password"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </button>
                                    <hr />
                                    {/* <button className="btn btn-google btn-user btn-block">
                                        <i className="fab fa-google fa-fw"></i> Register with Google
                                    </button>
                                    <button className="btn btn-facebook btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                    </button> */}
                                </form>
                                
                                {/* <div className="text-center">
                                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                                </div> */}
                                <div className="text-center">
                                    <a className="small" href="login.html">Already have an account? Login!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
