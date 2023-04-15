import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Component/Dashboard/Home'
import AdminDashboard from './Component/Pages/AdminDashboard'
import Notice from './Component/Pages/Notice'
import Report from './Component/Pages/Report'
import Setting from './Component/Pages/Setting'
import Signin from './Component/Users/Signin'
import Totalexceldata from './Component/Dashboard/Totalexceldata'
import Noticetemplate from './Component/settings/Noticetemplate'
import Createnotice from './Component/settings/Createnotice'
import Resetpass from './Component/Users/Resetpass';
import Signup from './Component/Users/Signup';
import UsersDashboard from './Component/Pages/UsersDashboard';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpass' element={<Resetpass />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/userdashboard' element={<UsersDashboard />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/report' element={<Report />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/home' element={<Home />} />
          <Route path='/totalexceldata/:id' element={<Totalexceldata />} />
          <Route path='/noticetemplate' element={<Noticetemplate />} />
          <Route path='/createnotice' element={<Createnotice />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App