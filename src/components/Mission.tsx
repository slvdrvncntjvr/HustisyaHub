import React from 'react';
import { FileText, Phone } from 'lucide-react';

export const Mission: React.FC = () => {
  return (
    <section className="mission-section">
      <div className="container">
        <h2 className="mission-title">Need Help Right Now?</h2>
        <div className="mission-content">
          <p className="mission-text">
            If you're experiencing harassment or need immediate support, our tools can help you take action.
          </p>
          <div className="mission-actions">
            <button className="btn-white">
              <FileText size={20} />
              Start a Report
            </button>
            <button className="btn-outline">
              <Phone size={20} />
              Emergency Contacts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
