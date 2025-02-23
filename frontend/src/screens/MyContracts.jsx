import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Contract from '../components/Contract';

export default function MyContracts() {
  const [myContracts, setMyContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = sessionStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchContracts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/itemContract/myContracts/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setMyContracts(data);
        } else {
          setError("No contracts found.");
        }
      } catch (error) {
        setError("Error fetching contracts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>My Contracts: {myContracts.length} Contracts</h1>
        <div>
          {myContracts.length === 0 ? (
            <>
              <Navbar />
              <p>No contracts found.</p>
            </>
          ) : (
            myContracts.map((contract) => (
              <div key={contract.id} className='my-2 border border-2'>
                <Contract contract={contract} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
