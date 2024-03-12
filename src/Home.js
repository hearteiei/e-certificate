import React from 'react'
import Sidebar from './Components/Sidebar'
import MainContent from './Components/MainContent'
import Topbar from './Components/Topbar'
import './All.css'
function Home() {
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Topbar */}
                    <Topbar />
                    {/* Your other content goes here */}
                    <MainContent/>
                </div>
            </div>
        </div>
    )
}

export default Home