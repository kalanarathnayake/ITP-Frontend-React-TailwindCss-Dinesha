import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";

import { PassList } from './components/adminPass-list.component';

import { CusPassList } from './components/customerPass-list.component';
import { CreatePass } from './components/customerPass-add.component';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>

          {/* cus */}
          <Route exact path="/createPass" element={<CreatePass />} />

          {/* admin */}
          <Route exact path="/pass" element={<PassList />} />

          <Route exact path="/customerPass" element={<CusPassList />} />

        </Routes>
      </Router>
    </div>
  );

}

export default App;
