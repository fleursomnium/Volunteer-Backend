import React, { useEffect, useState } from 'react';

function VolunteerMatchingForm() {
  const [volunteers, setVolunteers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/volcards')  // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setVolunteers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <main className="content">
        <div className="container">
          <h1>Event Name</h1>
          <p>Current Volunteers Registered to the Event</p>
          <div className="view-switch">
            <button className="card-active">Card View</button>
            <button>Table View</button>
          </div>
          <section className="volunteer-cards">
            {volunteers.map((volunteer, index) => (
              <div key={index} className="card">
                <div className="avatar"></div>
                <h3>{volunteer.name}</h3>
                <div className="tags">
                  {volunteer.skills.map((skill, idx) => (
                    <span key={idx}>{skill}</span>
                  ))}
                </div>
                <p className="preferences">
                  {volunteer.preferences}
                </p>
                <div className="actions">
                  <select name="event" className="event-selector">
                    <option>Add to event</option>
                  </select>
                  <button className="remove-btn">remove from event</button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default VolunteerMatchingForm;
