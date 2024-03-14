import React, { useState } from 'react';
import '../All.css';
import { FiAlignJustify } from "react-icons/fi";


function Sidebar() {
    // const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    // const toggleSidebarSize = () => {
    //     setSidebarCollapsed(!isSidebarCollapsed);
    // };

    return (
        // <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        //     <div class="sidebar-brand-text mx-3">
        //         <span>Verify</span>
        //         <span>Certificate</span>
        //     </div>
        //     <div class="line"></div> 
        //     <ul className="menu">
        //         <li>Dashboard</li>
        //         <div class="line"></div> 
        //         <li>Users</li>
        //         <li>Settings</li>
        //     </ul>
        //     <button onClick={toggleSidebarSize} className="toggle-btn">
        //         <FiAlignJustify />
        //     </button>
        // </div>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="Home">
                {/* <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div> */}
                <div className="sidebar-brand-text mx-3">Verify Certificate</div>
            </a>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="Home">
                    {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
                    <span>Dashboard</span>
                </a>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider" />

            {/* Heading */}
            <div className="sidebar-heading">
                Create Certificate
            </div>

            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link" href="Createone">
                    {/* <i className="fas fa-fw fa-chart-area"></i> */}
                    <span>Create for one</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="course">
                    {/* <i className="fas fa-fw fa-chart-area"></i> */}
                    <span>Create for a Course</span>
                </a>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            {/* <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div> */}
        </ul>





        
    );
}

export default Sidebar;