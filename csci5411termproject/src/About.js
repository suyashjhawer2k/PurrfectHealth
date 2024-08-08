// src/components/About.js
import React, { useState } from 'react';

function About({ user }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://q44h3fi2ub.execute-api.us-east-1.amazonaws.com/e1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.signInDetails.loginId }),
      });

      if (response.status === 200) {
        setAlertMessage('A mail has been sent. Kindly confirm it.');
        setAlertType('success');
      } else {
        setAlertMessage('Failed to sign up for Cat Disease and Protection Info. Please try again.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setAlertMessage('Failed to sign up for Cat Disease and Protection Info. Please try again.');
      setAlertType('error');
    } finally {
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="bg-base-100 shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-primary">About Purrfect Health</h1>
        <p className="mt-4 text-lg">
          Welcome to <span className="font-semibold text-secondary">Purrfect Health</span>! Our mission is to provide a reliable and user-friendly service for identifying and categorizing skin diseases in cats. 
        </p>
        <p className="mt-4 text-lg">
          With <span className="font-semibold text-secondary">Purrfect Health</span>, you can easily upload images of infected cat skin in JPG format. Our advanced detection system will analyze the image and categorize the disease into one of four categories: 
          <span className="font-semibold"> Bacterial, Fungal, Viral, or Parasitic.</span>
        </p>
        <p className="mt-4 text-lg">
          We are passionate about using technology to help pet owners and veterinarians identify and manage skin diseases effectively. If you have any questions or feedback, please do not hesitate to reach out to us. We are here to support you and your feline friends!
        </p>
        <div className="mt-6">
          <button className="btn btn-primary" onClick={handleSignUp}>Sign up for Cat Disease and Protection Info</button>
        </div>
      </div>

      {alertVisible && (
        <div className={`alert alert-${alertType} shadow-lg mt-4`}>
          <div>
            <span>{alertMessage}</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-tertiary" onClick={handleCloseAlert}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
