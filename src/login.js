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
                                                    name="username"
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Email"
                                                    value={inputs.username || ""}
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
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="register.html">Create an Account!</a>
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