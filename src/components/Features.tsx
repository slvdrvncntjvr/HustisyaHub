import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      title: "Magna Aliqua",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Duis Aute",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Excepteur Sint",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="features-title">Nostrud Exercitation</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="features-card">
              <h3 className="features-card-title">{feature.title}</h3>
              <p className="features-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
