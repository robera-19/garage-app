import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">403</div>

        <h1>Access Denied</h1>

        <p>
          You don't have permission to access this page. Please contact an
          administrator if you believe this is a mistake.
        </p>

        <button onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
