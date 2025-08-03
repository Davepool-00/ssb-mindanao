import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const membersWithContainImage = [
  "Ariel Polancos",
  "Gringo Jay Alaba",
  "Christian Dave S. Burgonios",
  "Joedel Lawas",
];

const members = [
  {
    name: "Ariel Polancos",
    image: "/members/ariel.jpeg",
    bio: "Lives for the curves, stays for the brotherhood.",
    bikes: ["Yamaha YZF-R3", "KTM Duke 390", "Honda CB650R"],
    memberSince: "January 1, 2025",
  },
  {
    name: "Gringo Jay Alaba",
    image: "/members/gringo.jpg",
    bio: "Always geared up for safety and speed.",
    bikes: ["Suzuki GSX-R150", "Honda Click 125"],
  },
  {
    name: "Japhit Malinao",
    image: "/members/japhit.jpg",
    bio: "Gasoline in his veins, thunder in his soul.",
    bikes: ["Yamaha MT-15"],
  },
  {
    name: "Rii MF",
    image: "/members/rii.jpg",
    bio: "Eyes on the road, heart in the wild.",
    bikes: ["Kawasaki Z400"],
  },
  {
    name: "Romell Alday",
    image: "/members/romell.jpg",
    bio: "Silence the noise, ignite the engine.",
    bikes: ["Honda CBR500R"],
  },
  {
    name: "Raffie Y. Sususco",
    image: "/members/raffie.jpg",
    bio: "Break limits, not bones. Ride smart.",
    bikes: ["Suzuki Raider R150", "Yamaha Aerox"],
  },
  {
    name: "Daniel Hall",
    image: "/members/daniel.jpg",
    bio: "The road is home, and the throttle is truth.",
    bikes: ["Yamaha XSR700"],
  },
  {
    name: "Richard Edoc",
    image: "/members/richard.jpg",
    bio: "In the blur of speed, he finds clarity.",
    bikes: ["Honda CB500X"],
  },
  {
    name: "Jesmer Ulay",
    image: "/members/jesmer.jpg",
    bio: "Fuel, faith, and full throttle.",
    bikes: ["KTM RC 200"],
  },
  {
    name: "Arman Diango",
    image: "/members/arman.jpg",
    bio: "Two wheels, one destiny.",
    bikes: ["Yamaha FZ-S"],
  },
  {
    name: "Ariel Sistoso",
    image: "/members/ariels.jpg",
    bio: "Takes corners like he takes chances—fearlessly.",
    bikes: ["Kawasaki Ninja 400"],
  },
  {
    name: "Joedel Lawas",
    image: "/members/joedel.jpg",
    bio: "Life begins at the end of your comfort zone—and at 100mph.",
    bikes: ["Suzuki V-Strom 250"],
  },
  {
    name: "Charville Ubagan",
    image: "/members/charville.jpg",
    bio: "Born to ride, forced to work.",
    bikes: ["Yamaha Sniper 155"],
  },
  {
    name: "Jericho Siaboc",
    image: "/members/jericho.jpg",
    bio: "Shifts gears smoother than he shifts moods.",
    bikes: ["Honda CBR150R"],
  },
  {
    name: "Jan Lee Megan A. Salarda",
    image: "/members/janlee.jpg",
    bio: "Rides with grace, leads with grit.",
    bikes: ["KTM Duke 200"],
  },
  {
    name: "John Frank Jason A. Kim",
    image: "/members/johnfrank.jpg",
    bio: "If it’s not loud, it’s not living.",
    bikes: ["Yamaha R15M"],
  },
  {
    name: "Yousef Ahmed",
    image: "/members/yousef.jpg",
    bio: "Desert winds or city streets—he owns them all.",
    bikes: ["Royal Enfield Meteor 350"],
  },
  {
    name: "Chris John A. Mabras",
    image: "/members/chrisjohn.jpg",
    bio: "Throttle therapy is the best kind of healing.",
    bikes: ["Honda XRM 125"],
  },
  {
    name: "Christian Dave S. Burgonios",
    image: "/members/christiandave.jpeg",
    folder: "Christian_Dave",
    bio: "Wheels beneath, fire within.",
    bikes: ["YZF-R3"],
  },
  {
    name: "Stephane Dave M. Balanghig",
    image: "/members/stephane.jpg",
    bio: "Where others see roads, he sees adventures.",
    bikes: ["YZF-R3"],
  },
];

function getImageStyle(name) {
  return membersWithContainImage.includes(name)
    ? {
        height: "300px",
        width: "100%",
        objectFit: "contain",
        backgroundColor: "#f8f9fa",
      }
    : {
        height: "300px",
        width: "100%",
        objectFit: "cover",
        objectPosition: "top",
      };
}

function App() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const shuffledMembers = useMemo(() => {
    const copy = [...members];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  // ✅ Load gallery images
  const loadGalleryImages = async (folder, clickedImagePath) => {
    const maxImages = 20;
    const preloadPromises = [];

    for (let i = 1; i <= maxImages; i++) {
      const src = `/members/${folder}/${i}.jpg`;

      preloadPromises.push(
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ src, exists: true });
          img.onerror = () => resolve({ src, exists: false });
          img.src = src;
        })
      );
    }

    const results = await Promise.all(preloadPromises);
    const validImages = results
      .filter((img) => img.exists)
      .map((img) => img.src);

    if (validImages.length === 0) {
      alert("No images found in the gallery.");
      return;
    }

    const startIndex = validImages.findIndex((img) => img === clickedImagePath);

    setLightboxImages(validImages.map((src) => ({ src })));
    setLightboxIndex(startIndex !== -1 ? startIndex : 0);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 4000);
    setTimeout(() => setIsLightboxOpen(true), 0);
  };

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

      {/* Origin */}
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

      {/* Status */}
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
            {shuffledMembers.map((member, index) => (
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
                    style={getImageStyle(member.name)}
                    onError={(e) => (e.target.src = "/members/default.jpg")}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{member.name}</h5>
                    <div className="card-text text-muted small">
                      <strong>Bike/s:</strong>
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

      {/* Member Modal */}
      {selectedMember && (
        <div
          className="modal d-block fade show"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            opacity: isLightboxOpen ? 0 : 1,
            pointerEvents: isLightboxOpen ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMember.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setSelectedMember(null);
                  }}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="mb-3"
                  style={getImageStyle(selectedMember.name)}
                  onError={(e) => (e.target.src = "/members/default.jpg")}
                />
                <p className="text-muted">{selectedMember.bio}</p>
                {selectedMember.memberSince && (
                  <p className="text-muted">
                    <strong>Member Since:</strong> {selectedMember.memberSince}
                  </p>
                )}
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

                {/* 📸 Gallery */}
                {selectedMember.folder && (
                  <div className="mt-4">
                    <h6 className="mb-2">📷 Gallery</h6>
                    <div className="row g-2">
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (index) => {
                          const imagePath = `/members/${selectedMember.folder}/${index}.jpg`;
                          return (
                            <div className="col-4 col-md-3" key={index}>
                              <img
                                src={imagePath}
                                alt={`Gallery ${index}`}
                                className="img-fluid rounded"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  loadGalleryImages(
                                    selectedMember.folder,
                                    imagePath
                                  )
                                }
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <>
        {isLightboxOpen && (
          <>
            {showHint && (
              <div
                style={{
                  position: "fixed",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  zIndex: 2000,
                  fontSize: "14px",
                }}
              >
                ⚠️ First image may take time. Please click next or previous.
                Still in development.
              </div>
            )}

            <Lightbox
              plugins={[Zoom]}
              open={isLightboxOpen}
              close={() => setIsLightboxOpen(false)}
              slides={lightboxImages}
              index={lightboxIndex}
              on={{
                view: ({ index }) => setLightboxIndex(index),
              }}
            />
          </>
        )}
      </>

      {/* Footer */}
      <footer className="bg-black text-white py-3 text-center">
        <div className="container">
          <small>
            © {new Date().getFullYear()} Sunshine Boyz Mindanao. All rights
            reserved.
          </small>
        </div>
      </footer>
    </>
  );
}

export default App;
