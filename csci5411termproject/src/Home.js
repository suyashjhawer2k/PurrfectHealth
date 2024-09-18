// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ user, signOut }) {
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid JPG image.');
    }
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!base64Image) {
      alert('Please upload an image first.');
      return;
    }
    const payload = {
      userId: user.username,
      image: base64Image,
    };
    try {
      simulateLoading();
      const response = await fetch('API TO RUN THE MODEL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const responseBody = JSON.parse(data.body);
      const confidenceDisplay = responseBody.result.confidence !== undefined ? responseBody.result.confidence : 'N/A';

      setDiseaseInfo(`Disease: ${responseBody.result.disease || 'Unknown'}, Confidence: ${confidenceDisplay}`);
    } catch (error) {
      console.error('Error submitting the image:', error);
      alert('Failed to submit the image. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingProgress(100);
    }
  };

  const navigateToHistory = () => {
    navigate('/history');
  };

  const handleShowReportModal = async () => {
    try {
      const response = await fetch('API FOR REPORT GENERATION', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.signInDetails.loginId, // Using user's email from props
          disease: diseaseInfo.split(': ')[1].split(',')[0], // Extracting disease from the diseaseInfo state
        }),
      });
      const data = await response.json();
      if (response.status === 400) {
        setReportMessage('Kindly subscribe to the application via the mail sent to your email.');
      } else {
        setReportMessage('Email sent with detailed report.');
      }
    } catch (error) {
      console.error('Error requesting report:', error);
      setReportMessage('Failed to request the report. Please try again.');
    }
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="navbar bg-base-200 rounded-box shadow-lg mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary">Hello!</h1>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary mr-2" onClick={navigateToHistory}>History</button>
          <button className="btn btn-error" onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <div className="card bg-base-100  p-6 mb-8">
          <h2 className="card-title text-secondary mb-4" style={{display:'block' , textAlign:'center'}}>Upload Image</h2>
          <div className="form-control items-center">
            <input
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-4"
              type="file"
              accept="image/jpeg"
              onChange={handleFileUpload}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        {isLoading && (
          <div className="alert alert-info mt-4">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${loadingProgress}%` }}
              >
                {`${loadingProgress}%`}
              </div>
            </div>
            <span>Loading prediction...</span>
          </div>
        )}
        {diseaseInfo && !isLoading && (
          <div className="alert alert-success mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{diseaseInfo}</span>
          </div>
        )}
      </div>

      {showReportModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Detailed Report</h3>
            <p className="py-4">{reportMessage}</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCloseReportModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
