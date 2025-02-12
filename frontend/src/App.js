import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For dropdowns, toggler, etc.
// bootstrap dark background
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}> </Route>
        <Route path= "/signup" element= {<Signup/>} />
        <Route path= "/login" element= {<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
