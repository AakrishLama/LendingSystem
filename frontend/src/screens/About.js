import React from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="border border-gray-300 rounded-lg shadow-lg p-4">
          <h1 className="text-center text-3xl font-bold mb-4">About Lending System</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">What is Lending System?</h2>
            <p className="mb-2">
              Lending System is a community-based platform that allows users to lend and borrow items
              from each other using a credit-based system. Instead of letting your items sit unused,
              share them with others and earn credits that you can use to borrow items you need!
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-3">
              <div className="border border-gray-200 rounded p-3 shadow-sm">
                <h3 className="font-medium mb-2">1. List Your Items</h3>
                <p>Add items you're willing to lend. Each item you add gives you 100 credits to start borrowing.</p>
                <div className="mt-2 w-full overflow-hidden">
                  <img 
                    src="/MyItems.png" 
                    className=" object-contain" 
                    alt="My Items Page"
                    style={{ objectFit: "fill" , height: "500px"}}
                  />
                </div>
              </div>
              <div className="border border-gray-200 rounded p-3 shadow-sm">
                <h3 className="font-medium mb-2">2. Browse & Borrow</h3>
                <p>Search for items you need. Spend your credits to borrow items from other users.</p>
                <div className="mt-2 w-full overflow-hidden">
                  <img 
                    src="/HomePage.png" 
                    className="object-contain" 
                    style = {{ objectFit: "fill" , height: "500px" }}
                    alt="Home Page"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Credit-based system - no real money needed</li>
              <li>Secure user authentication</li>
              <li>Digital contracts for all transactions</li>
              <li>Easy item search functionality</li>
              <li>Downloadable contract PDFs</li>
              <li>Automatic contract expiration system</li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">For Lenders:</h3>
                <ul className="list-disc pl-5">
                  <li>Make use of items you don't need right now</li>
                  <li>Earn credits to borrow things later</li>
                  <li>Help build a sharing community</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1">For Borrowers:</h3>
                <ul className="list-disc pl-5">
                  <li>Access items without purchasing</li>
                  <li>Try before you buy</li>
                  <li>Save money and storage space</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded mt-5">
            <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
            <p>
              Sign up today and receive 100 initial credits. Add your first item to get additional credits
              and start borrowing right away!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}