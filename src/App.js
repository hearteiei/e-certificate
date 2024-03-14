import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './Home';
import Createone from './Createone';
import Createmany from './Createmany';
import Newcourse from './Newcourse';
import Template from './Template';
import Importexcel from './Importexcel';
import Course from './Course';
import Register from './Register';
import Otp from './Otp';
import Export from './Export';
import View from './View';
import Check from './Check';
import Fetch from './Fetch';
function App() {
  const token = localStorage.getItem('accessToken');
  const regis = localStorage.getItem('register')

  // if(!token) {
  //   return <Login />
  // }


  return (
    <div>
    <Routes>
    <Route path="*" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/fetch" element={<Fetch />} />
      <Route path="/register" element={<Register />} />
      {regis === 'Success' && <Route path="/otp" element={<Otp />} />}
      {token && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/createone" element={<Createone />} />
          <Route path="/createmany" element={<Createmany />} />
          <Route path="/newcourse" element={<Newcourse />} />
          <Route path="/template" element={<Template />} />
          <Route path="/importexcel" element={<Importexcel />} />
          <Route path="/course" element={<Course />} />
          <Route path="/export" element={<Export />} />
          <Route path="/view" element={<View />} />
          <Route path="/check" element={<Check />} />
        </>
      )}
    </Routes>
  </div>
);
}

export default App;