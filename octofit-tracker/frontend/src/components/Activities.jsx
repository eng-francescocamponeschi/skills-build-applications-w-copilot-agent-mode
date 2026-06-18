import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../config/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName && codespaceName.trim() !== ''
      ? `https://${codespaceName}-8000.app.github.dev/api/activities`
      : `${getApiBaseUrl()}/activities`;
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setActivities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading activities...</div>;
  if (error) return <div className="alert alert-danger p-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity._id || activity.id}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
