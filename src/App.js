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
function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element ={<Login />} />
      <Route path="/login" element ={<Login />} />
      <Route path="/home" element ={<Home/>} />
      <Route path="/createone" element ={<Createone/>} />
      <Route path="/createmany" element ={<Createmany/>} />
      <Route path="/newcourse" element ={<Newcourse/>} />
      <Route path="/template" element ={<Template/>} />
      <Route path="/importexcel" element ={<Importexcel/>} />
     </Routes>
    </div>
  );
}

export default App;