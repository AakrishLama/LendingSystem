import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

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
          setError("Failed to fetch contracts. Please try again later.");
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
  console.log("myContracts", myContracts);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>My Contracts</h1>
        <div>
          {myContracts.length === 0 ? (
            <p>No contracts found.</p>
          ) : (
            myContracts.map((contract) => (
              <div key={contract.id}>
                {/* Render contract details here */}
                <p>Contract with {contract.borrower.name}</p>
                {/* You can add more details based on contract data */}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
