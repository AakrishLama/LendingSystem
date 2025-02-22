import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

export default function AddContract() {
  const {user}= useContext(AuthContext);
  const location = useLocation();


  const itemId = location.state?.itemId;

  return (
    <div>
      <p>Item ID = {itemId ? itemId : "No ID provided"}</p>
      <p>borrower ID = {user.id}</p>
      Add contract
    </div>
  );
}


//   @PostMapping("/addContract/{borrowerId}/{itemId}/{startDate}/{endDate}")
