import React from 'react'

export default function ({ contract }) {
  if (!contract) {
    return (
      <>
        <p>Loading contract...</p>
      </>
    );
  }
  console.log(contract);
  console.log("contract id", contract.id);

  return (
    <div className="container border p-4 rounded shadow">
      <h2 className="text-center mb-4">Contract with {contract.item.name}</h2>

      {/* Contract Info */}
      <div className="mb-3">
        <strong>Contract ID:</strong> {contract.id} <br />
        <strong>Date of Creation:</strong> {contract.dateOfCreation} <br />
        <strong>Start Date:</strong> {contract.startDate} <br />
        <strong>End Date:</strong> {contract.endDate}
      </div>

      {/* Borrower Info */}
      <div className="mb-3">
        <h4>Borrower Details</h4>
        <strong>Name:</strong> {contract.borrower.name} <br />
        <strong>Email:</strong> {contract.borrower.email} <br />
        <strong>Credits:</strong> {contract.borrower.credits}
      </div>

      {/* Item Info */}
      <div className="mb-3">
        <h4>Item Details</h4>
        <strong>Name:</strong> {contract.item.name} <br />
        <strong>Category:</strong> {contract.item.category} <br />
        <strong>Description:</strong> {contract.item.description} <br />
        <strong>Price per Day:</strong> {contract.item.pricePerDay} <br />
        <strong>Available:</strong> {contract.item.available ? "Yes" : "No"} <br />
        <img
          src={`data:${contract.item.imageType};base64,${contract.item.imageData}`}
          alt={contract.item.imageName}
          className="img-fluid mt-2"
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
      </div>

      {/* Owner Info */}
      <div className="mb-3">
        <h4>Owner Details</h4>
        <strong>Name:</strong> {contract.owner.name} <br />
        <strong>Email:</strong> {contract.owner.email} <br />
      </div>
      <button className='btn btn-primary'>DownLoad</button>
    </div>
  );
}
