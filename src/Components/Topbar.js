// Topbar.js
import React from 'react';
import UndrawProfileImage from '../img/undraw_profile.svg'; 

function Topbar() {
    const data = localStorage.getItem('User');
    const account =JSON.parse(data);
    // console.log(account);
    // console.log(account.firstname+" "+ account.lastname);
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("User");
        localStorage.removeItem("Email");
        window.location.href = "/";
      };
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{account.firstname}</span>
                        <img className="img-profile rounded-circle" onClick={handleLogout} src={UndrawProfileImage} alt="User Profile" />
                    </a>
                    {/* Dropdown - User Information */}
                    {/* <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div> */}
                </li>
            </ul>
        </nav>
    );
}

export default Topbar;