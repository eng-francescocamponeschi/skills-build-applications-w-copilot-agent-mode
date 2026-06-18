import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFromApi('/workouts')
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger p-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="small text-muted">
                    Difficulty: <span className="badge bg-info">{workout.difficulty}</span>
                  </p>
                  {Array.isArray(workout.exercises) && (
                    <div>
                      <p className="small">Exercises:</p>
                      <ul className="small">
                        {workout.exercises.map((ex, idx) => (
                          <li key={idx}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
