import React from 'react';
import { jsPDF } from 'jspdf';

export default function Contract({ contract }) {
  if (!contract) {
    return <p>Loading contract...</p>;
  }

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Contract Details", 10, 10);
    doc.setFontSize(12);

    doc.text(`Contract ID: ${contract.id}`, 10, 20);
    doc.text(`Date of Creation: ${contract.dateOfCreation}`, 10, 30);
    doc.text(`Start Date: ${contract.startDate}`, 10, 40);
    doc.text(`End Date: ${contract.endDate}`, 10, 50);

    doc.text("Borrower Details:", 10, 70);
    doc.text(`Name: ${contract.borrower.name}`, 10, 80);
    doc.text(`Email: ${contract.borrower.email}`, 10, 90);
    doc.text(`Credits: ${contract.borrower.credits}`, 10, 100);

    doc.text("Item Details:", 10, 120);
    doc.text(`Name: ${contract.item.name}`, 10, 130);
    doc.text(`Category: ${contract.item.category}`, 10, 140);
    doc.text(`Description: ${contract.item.description}`, 10, 150);
    doc.text(`Price per Day: ${contract.item.pricePerDay}`, 10, 160);

    doc.text("Owner Details:", 10, 180);
    doc.text(`Name: ${contract.owner.name}`, 10, 190);
    doc.text(`Email: ${contract.owner.email}`, 10, 200);

    // Add image if available
    if (contract.item.imageData) {
      const imgData = `data:${contract.item.imageType};base64,${contract.item.imageData}`;
      doc.addImage(imgData, contract.item.imageType.toUpperCase(), 10, 220, 80, 50); // Adjust position & size
    }

    doc.save(`Contract-${contract.id}.pdf`);
  };

  return (
    <div className="container border p-4 rounded shadow">
      <h2 className="text-center mb-4">Contract with {contract.item.name}</h2>

      <div className="mb-3">
        <strong>Contract ID:</strong> {contract.id} <br />
        <strong>Date of Creation:</strong> {contract.dateOfCreation} <br />
        <strong>Start Date:</strong> {contract.startDate} <br />
        <strong>End Date:</strong> {contract.endDate}
      </div>

      <div className="mb-3">
        <h4>Borrower Details</h4>
        <strong>Name:</strong> {contract.borrower.name} <br />
        <strong>Email:</strong> {contract.borrower.email} <br />
        <strong>Credits:</strong> {contract.borrower.credits}
      </div>

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

      <div className="mb-3">
        <h4>Owner Details</h4>
        <strong>Name:</strong> {contract.owner.name} <br />
        <strong>Email:</strong> {contract.owner.email} <br />
      </div>

      <button className="btn btn-primary" onClick={handleDownload}>
        Download PDF
      </button>
    </div>
  );
}
