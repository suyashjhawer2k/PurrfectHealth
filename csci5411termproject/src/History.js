import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function History({ user, signOut }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setLoadingProgress(0);
      simulateLoading();
      const response = await fetch('API TO FETCH USER HISTORY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.username }),
      });
      const data = await response.json();
      setUserData(JSON.parse(data.body));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch history. Please try again.');
      setLoading(false);
    }
  };

  const simulateLoading = () => {
    const interval = setInterval(() => {
      setLoadingProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5; // Increase the progress by 5% every interval
      });
    }, 100); // 100 milliseconds interval
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${loadingProgress}%` }}
          >
            {`${loadingProgress}%`}
          </div>
        </div>
        <span>Loading history...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl" style={{ height: 'fit-content', backgroundColor: 'grey' }}>
      <div className="navbar bg-base-100 rounded-box shadow-lg mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary">Prediction History</h1>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary mr-2" onClick={navigateToHome}>Home</button>
          <button className="btn btn-error" onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-6">
        {userData.length === 0 ? (
          <div className="alert alert-info">No history available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Disease</th>
                  <th>Confidence</th>
                  <th>Image</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.disease}</td>
                    <td>{item.confidence}</td>
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={`Disease ${index}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
