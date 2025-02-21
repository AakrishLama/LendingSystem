import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; // For dropdowns, toggler, etc.
// bootstrap dark background
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import AddItem from './screens/AddItem';
import { AuthProvider } from './components/AuthContext';
import MyProfile from './screens/MyProfile';
import ItemDetails from './screens/ItemDetails';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="addItem" element={<AddItem />}> </Route>
          <Route path="/myProfile" element={<MyProfile />}> </Route>
          <Route path="/ItemDetails" element={<ItemDetails />}> </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
