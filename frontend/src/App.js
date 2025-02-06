import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './screens/Signup';
import Login from './screens/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/signup" element= {<Signup/>} />
        <Route path= "/login" element= {<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
