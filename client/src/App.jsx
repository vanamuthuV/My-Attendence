import React from 'react'
import './App.css'
import { ButtonAppBar } from './Header/Header'
import { Body } from './Body/Body'
import { Students } from './Body/Body'
import {BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { StudentHistory } from './Body/Body'
import { IndiviualClass } from './Body/Body'
import { Login } from './Body/Body'
import { AuthProvider } from '../context/context'
import { AddStudent } from './Body/Body'
import { TakeAttendance } from './Body/Body'
import { Attendance } from './Body/Body'
import { UpdateDetails } from './Body/Body'
import { StudentDetails } from './Body/Body'
import Footer from './footer'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/GetStudentList" element={<Students />} />
          <Route
            path="/GetStudentList/:student_id"
            element={<StudentHistory />}
          />
          <Route
            path="/GetStudentList/:student_id/:date"
            element={<IndiviualClass />}
          />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/takeattendance" element={<TakeAttendance />} />
          <Route path="/takeattendance/:subid" element={<Attendance />} />
          <Route path="/updatedetails" element={<UpdateDetails />} />
          <Route path="/updatedetails/:id" element={<StudentDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App