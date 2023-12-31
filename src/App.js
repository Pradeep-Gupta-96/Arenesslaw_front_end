import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notice from './Component/Pages/Notice'
import Signin from './Component/Users/Signin'
import Totalexceldata from './Component/Dashboard/Totalexceldata'
import Resetpass from './Component/Users/Resetpass';
import Signup from './Component/Users/Signup';
import AdminNavbar from './Component/Navbar/AdminNavbar';
import ResetwithOTP from './Component/Users/ResetwithOTP';
import DetailsPage from './Component/Dashboard/DetailsPage';
import EmplyeeDashboard from './Component/Pages/EmplyeeDashboard';
import EmpolyeeTotaldata from './Component/Dashboard/EmpolyeeTotaldata';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpass' element={<Resetpass />} />
          <Route path='/resetwithOTP' element={<ResetwithOTP/>}/>
          <Route path='/adminNavbar' element={<AdminNavbar />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/totalexceldata/:id' element={<Totalexceldata />} />
          <Route path='/empolyeeTotaldata/:id' element={<EmpolyeeTotaldata />} />
          <Route path='/detailspage/:id' element={<DetailsPage/>}/>
          <Route path='/emplyeeDashboard' element={<EmplyeeDashboard/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App