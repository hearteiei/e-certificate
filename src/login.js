import React from 'react'
import { useState } from 'react'

export default function Login() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const requestData = {
            Mail: inputs.email,
            password: inputs.password
        };
        console.log(requestData);
    
        fetch('http://localhost:8000/login', {
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
            // Handle successful response
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('User', JSON.stringify(data.user));
            // const account = localStorage.getItem('User');
            // console.log(account)
            console.log('login successful:', data);
            // console.log(data.user);

            window.location.href = "/home";
        })
        .catch(error => {
            // Handle errors
            console.error('login failed:', error);
        });
    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <label>Username:
        //         <input
        //             type="text"
        //             name="username"
        //             value={inputs.username || ""}
        //             onChange={handleChange}
        //         />
        //     </label>
        //     <label>password:
        //         <input
        //             type="password"
        //             name="password"
        //             value={inputs.password || ""}
        //             onChange={handleChange}
        //         />
        //     </label>
        //     <input type="submit" />
        // </form>


        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Log in</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Email"
                                                    value={inputs.email || ""}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Password"
                                                    value={inputs.password || ""}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr />
                                            {/* <button type="button" className="btn btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with CMU
                                            </button> */}
                                            {/* <button type="button" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </button> */}
                                        </form>
                                        {/* <hr /> */}
                                        {/* <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> */}
                                        <div className="text-center">
                                            <a className="small" href="register">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}