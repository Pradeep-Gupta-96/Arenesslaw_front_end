import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './Component/Pages/AdminDashboard'
import Notice from './Component/Pages/Notice'
import Setting from './Component/Pages/Setting'
import Signin from './Component/Users/Signin'
import Totalexceldata from './Component/Dashboard/Totalexceldata'
import Resetpass from './Component/Users/Resetpass';
import Signup from './Component/Users/Signup';
import Createnotice from './Component/settings/Notices/Temp2/Createnotice';
import Opendetails from './Component/settings/Notices/Temp2/Opendetails';
import AdminNavbar from './Component/Navbar/AdminNavbar';
import Openemaildetails from './Component/settings/Emails/Temp1/Openemaildetails';
import Createemails from './Component/settings/Emails/Temp1/Createemails';
import Createconfig from './Component/settings/Emails/Econfig/Createconfig';
import Openconfig from './Component/settings/Emails/Econfig/Openconfig';
import Createnoticeconfig from './Component/settings/Notices/noticeConfig/Createnoticeconfig';
import Opennoticeconfig from './Component/settings/Notices/noticeConfig/Opennoticeconfig';
import OpendetailAuth from './Component/settings/Notices/SigningAuthority2/OpendetailAuth';
import CreatedetailsAuth from './Component/settings/Notices/SigningAuthority2/CreatedetailsAuth';
import Openemailauth from './Component/settings/Emails/SigningAuthority1/Openemailauth';
import Createemailauth from './Component/settings/Emails/SigningAuthority1/Createemailauth';
import Editmailtemp from './Component/settings/Emails/Temp1/Editmailtemp';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpass' element={<Resetpass />} />
          <Route path='/adminNavbar' element={<AdminNavbar />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/totalexceldata/:id' element={<Totalexceldata />} />
          <Route path='/createnotice' element={<Createnotice />} />
          <Route path='/opendetails' element={<Opendetails />} />
          <Route path='/createemails' element={<Createemails />} />
          <Route path='/openemaildetails' element={<Openemaildetails />} />
          <Route path='/createconfig' element={<Createconfig />} />
          <Route path='/openconfig' element={<Openconfig />} />
          <Route path='/createnoticeconfig' element={<Createnoticeconfig />} />
          <Route path='/opennoticeconfig' element={<Opennoticeconfig />} />
          <Route path='/createdetailsAuth' element={<CreatedetailsAuth />} />
          <Route path='/opendetailAuth' element={<OpendetailAuth />} />
          <Route path='/createemailauth' element={<Createemailauth />} />
          <Route path='/openemailauth' element={<Openemailauth />} />
          <Route path='/editmailtemp/:id' element={<Editmailtemp/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App