import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const members = [
  {
    name: "Ariel Polancos",
    image: "/members/ariel.jpeg",
    bio: "Lives for the curves, stays for the brotherhood.",
    bikes: ["Yamaha YZF-R3", "KTM Duke 390", "Honda CB650R"],
    memberSince: "January 1, 2025",
  },
  {
    name: "Jane Smith",
    image: "/members/jane.jpg",
    bio: "Always geared up for safety and speed.",
    bikes: ["Suzuki GSX-R150", "Honda Click 125"],
  },
  // More members...
];

function App() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top shadow">
        <div className="container">
          <a className="navbar-brand" href="#home">
            SSB Mindanao
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navLinks"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navLinks">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#origin">
                  Origin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#status">
                  Status
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#members">
                  Members
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="bg-black text-white text-center py-5">
        <div className="container">
          <img
            src="/logo.png"
            alt="SSB Logo"
            style={{ height: "120px" }}
            className="mb-3"
          />
          <h1 className="display-4 fw-bold">Sunshine Boyz Mindanao</h1>
          <p className="lead text-danger">
            United by passion. Driven by brotherhood.
          </p>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p className="text-muted fs-5">
            SSB Mindanao is a motorcycle group built on camaraderie, respect,
            and a deep love for riding. We believe in safety, inclusivity, and
            developing our members’ skills to the highest standards.
          </p>
        </div>
      </section>

      {/* Origin & Purpose */}
      <section id="origin" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Origin & Purpose</h2>
          <p className="fs-5 text-justify">
            The purpose of SSB is to foster camaraderie and mutual respect among
            its members while promoting safe and enjoyable riding experiences.
            It is dedicated to upholding the values of genuine brotherhood,
            teamwork, and a shared passion for motorcycling.
          </p>
          <p className="fs-5 text-justify">
            SSB emphasizes safety, with strict standards for motorcycle engine
            displacement, riding gear, and rider quality. Through regular
            skill-building, training, and open communication, we ensure every
            member upholds the highest standards of etiquette and proficiency.
          </p>
        </div>
      </section>

      {/* Clarification of Status */}
      <section id="status" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Clarification of Status</h2>
          <p className="fs-5 text-justify">
            Initially, SSB operated as an informal group chat for like-minded
            individuals and was not intended to function as a formal
            organization. However, due to developments within the previous club,
            the group has taken steps to formalize its structure as "The
            Sunshine Boyz," an independent organization.
          </p>
          <p className="fs-5 text-justify">
            The transition to formalization is undertaken without animosity
            toward any prior affiliations but reflects a commitment to fostering
            a positive environment for motorcycle enthusiasts.
          </p>
        </div>
      </section>

      {/* Members */}
      <section id="members" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Members</h2>
          <div className="row">
            {members.map((member, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div
                  className="card h-100 shadow text-center member-card"
                  role="button"
                  onClick={() => setSelectedMember(member)}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/members/default.jpg")}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{member.name}</h5>
                    <div className="card-text text-muted small">
                      <strong>Bikes:</strong>
                      <ul className="list-unstyled mb-0">
                        {member.bikes.map((bike, i) => (
                          <li key={i}>🏍️ {bike}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-3 text-center">
        <div className="container">
          <small>
            © {new Date().getFullYear()} Sunshine Boyz Mindanao. All rights
            reserved.
          </small>
        </div>
      </footer>

      {/* Member Modal */}
      {selectedMember && (
        <div
          className="modal d-block fade show"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMember.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMember(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  className="mb-3"
                  onError={(e) => (e.target.src = "/members/default.jpg")}
                />
                <p className="text-muted">{selectedMember.bio}</p>
                <p className="text-muted">
                  <strong>Member Since:</strong> {selectedMember.memberSince}
                </p>

                <div className="text-start">
                  <p>
                    <strong>Bikes:</strong>
                  </p>
                  <ul>
                    {selectedMember.bikes.map((bike, i) => (
                      <li key={i}>🏍️ {bike}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
