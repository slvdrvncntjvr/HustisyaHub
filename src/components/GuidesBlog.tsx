import React from 'react';

export const GuidesBlog: React.FC = () => {
  const guides = [
    {
      title: "Lorem Ipsum Dolor",
      category: "Category A",
      date: "Dec 3, 2025"
    },
    {
      title: "Sit Amet Consectetur",
      category: "Category B",
      date: "Dec 2, 2025"
    },
    {
      title: "Adipiscing Elit",
      category: "Category C",
      date: "Nov 28, 2025"
    }
  ];

  return (
    <section className="guides-blog-section">
      <div className="container">
        <h2 className="guides-title">Ullamco Laboris</h2>
        <div className="guides-list">
          {guides.map((guide, index) => (
            <div key={index} className="guides-item">
              <div className="guides-content">
                <span className="guides-category">{guide.category}</span>
                <h3 className="guides-item-title">{guide.title}</h3>
                <span className="guides-date">{guide.date}</span>
              </div>
              <button className="guides-read-more">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
