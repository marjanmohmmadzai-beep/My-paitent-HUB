import { useState } from 'react'
import './App.css'
const doctors = [
  {
    id: 1,
    name: 'Dr. Shafiq Omid',
    gender: 'Male',
    specialty: 'Cardiology',
    rating: 4.9,
    hospital: 'Kabul Heart Center',
    location: 'Kabul, Afghanistan',
    available: '9:00 AM - 2:00 PM',
    phone: '+93 700 000 001',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 2,
    name: 'Dr. Marjan Mohammadzai',
    gender: 'Female',
    specialty: 'Dermatology',
    rating: 4.8,
    hospital: 'City Medical Center',
    location: 'Kabul, Afghanistan',
    available: '10:00 AM - 4:00 PM',
    phone: '+93 700 000 002',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 3,
    name: 'Dr. Omar Mohammadzai',
    gender: 'Male',
    specialty: 'Neurology',
    rating: 4.7,
    hospital: 'Kabul Medical Hospital',
    location: 'Kabul, Afghanistan',
    available: '8:00 AM - 1:00 PM',
    phone: '+93 700 000 003',
    languages: 'English, Dari',
    image: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 4,
    name: 'Dr. Marwa Mohammadzai',
    gender: 'Female',
    specialty: 'Pediatrics',
    rating: 4.9,
    hospital: 'Children Care Center',
    location: 'Kabul, Afghanistan',
    available: '9:00 AM - 3:00 PM',
    phone: '+93 700 000 004',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=44',
  },
]
const products = [
  {
    id: 1,
    name: 'Blood Pressure Monitor',
    category: 'Medical Devices',
    price: 25,
    oldPrice: 35,
    rating: 4.8,
    image: '🩺',
    description: 'Digital blood pressure monitor for home use.',
  },
  {
    id: 2,
    name: 'Medical Face Masks',
    category: 'Personal Care',
    price: 8.5,
    oldPrice: 12,
    rating: 4.7,
    image: '😷',
    description: 'Disposable protective face masks.',
  },
  {
    id: 3,
    name: 'Nitrile Gloves',
    category: 'Personal Care',
    price: 12,
    oldPrice: 18,
    rating: 4.8,
    image: '🧤',
    description: 'Powder-free disposable gloves.',
  },
  {
    id: 4,
    name: 'Digital Thermometer',
    category: 'Medical Devices',
    price: 6.5,
    oldPrice: 10,
    rating: 4.5,
    image: '🌡️',
    description: 'Digital thermometer for quick temperature checks.',
  },
  {
    id: 5,
    name: 'First Aid Kit',
    category: 'First Aid',
    price: 18,
    oldPrice: 25,
    rating: 4.7,
    image: '🧰',
    description: 'Portable first aid kit for home and travel.',
  },
]
const categories = [
  'All',
  'Medical Devices',
  'Personal Care',
  'First Aid',
]
function App() {
  const [page, setPage] = useState('doctor')
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [gender, setGender] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [view, setView] = useState('list')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [message, setMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [productCategory, setProductCategory] = useState('All')
  const [savedName, setSavedName] = useState('My Patient')
  const [savedEmail, setSavedEmail] = useState('patient@example.com')
  const [notifications, setNotifications] = useState({
    appointments: true,
    healthTips: true,
    offers: false,
  })
  const specialties = [
    'All',
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ]
  const filteredDoctors = doctors
    .filter((doctor) => {
      const query = search.toLowerCase().trim()
      const matchesSearch =
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query)
      const matchesSpecialty =
        specialty === 'All' || doctor.specialty === specialty
      const matchesGender =
        gender === 'All' || doctor.gender === gender
      return matchesSearch && matchesSpecialty && matchesGender
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      return a.name.localeCompare(b.name)
    })
  const filteredProducts = products.filter((product) => {
    const query = productSearch.toLowerCase().trim()
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query)
    const matchesCategory =
      productCategory === 'All' ||
      product.category === productCategory
    return matchesSearch && matchesCategory
  })
  function showPage(nextPage) {
    setPage(nextPage)
    setMessage('')
  }
  function resetFilters() {
    setSearch('')
    setSpecialty('All')
    setGender('All')
    setSortBy('name')
  }
  function handleBooking(doctor) {
    setMessage(
      `Appointment request prepared for ${doctor.name}. Please contact ${doctor.phone} to confirm.`,
    )
    setSelectedDoctor(null)
  }
  function toggleNotification(key) {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }
  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">+</div>
          <h2>
            MyPatient<span>HUB</span>
          </h2>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={
              page === 'doctor' ? 'nav-link active' : 'nav-link'
            }
            onClick={() => showPage('doctor')}
          >
            <span className="icon">🩺</span>
            <span>Find Doctor</span>
          </button>
          <button
            type="button"
            className={
              page === 'marketplace'
                ? 'nav-link active'
                : 'nav-link'
            }
            onClick={() => showPage('marketplace')}
          >
            <span className="icon">🛍️</span>
            <span>Marketplace</span>
          </button>
          <button
            type="button"
            className={
              page === 'settings' ? 'nav-link active' : 'nav-link'
            }
            onClick={() => showPage('settings')}
          >
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>
        <div className="download-card">
          <h4>Healthcare on the go</h4>
          <p>Manage your healthcare needs in one place.</p>
          <div className="store-buttons">
            <button
              type="button"
              onClick={() =>
                setMessage('App Store link is not configured.')
              }
            >
              App Store
            </button>
            <button
              type="button"
              onClick={() =>
                setMessage('Google Play link is not configured.')
              }
            >
              Google Play
            </button>
          </div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            Home / <strong>
              {page === 'doctor'
                ? 'Find Doctor'
                : page === 'marketplace'
                  ? 'Marketplace'
                  : 'Settings'}
            </strong>
          </div>
          <div className="topbar-right">
            <input
              className="top-search"
              placeholder="Search doctors..."
              aria-label="Search doctors"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage('doctor')
              }}
            />
            <button
              type="button"
              className="top-icon"
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearch('')
                setMessage('Doctor search cleared.')
              }}
            >
              Clear Search
            </button>
          </div>
        </header>
        {message && (
          <div className="status-message" role="status">
            <span>{message}</span>
            <button
              type="button"
              onClick={() => setMessage('')}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}
        {page === 'doctor' && (
          <>
            <section className="doctor-hero">
              <div className="hero-eyebrow">
                YOUR HEALTH, OUR PRIORITY
              </div>
              <h1>Find the Right Doctor for You</h1>
              <p>
                Discover trusted healthcare professionals and find the
                care you deserve.
              </p>
              <form
                className="hero-search"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  className="hero-input"
                  placeholder="Search by doctor, specialty, or hospital..."
                  aria-label="Search by doctor, specialty, or hospital"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button type="submit">Search Doctors</button>
              </form>
              <div className="hero-points">
                <span>✓ Easy Search</span>
                <span>✓ Multiple Specialties</span>
                <span>✓ Patient Focused</span>
              </div>
            </section>
            <section className="doctor-layout">
              <aside className="filters">
                <h3>Filter Doctors</h3>
                <div className="filter-item">
                  <label htmlFor="specialty">
                    Medical Specialty
                  </label>
                  <select
                    id="specialty"
                    value={specialty}
                    onChange={(event) =>
                      setSpecialty(event.target.value)
                    }
                  >
                    {specialties.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-item">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(event) =>
                      setGender(event.target.value)
                    }
                  >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="filter-item">
                  <label htmlFor="sort">Sort By</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                  >
                    <option value="name">Doctor Name</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="profile-button full-width"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </aside>
              <div className="results">
                <div className="results-header">
                  <div>
                    <h2>Available Doctors</h2>
                    <p>
                      {filteredDoctors.length} doctor
                      {filteredDoctors.length === 1 ? '' : 's'} found
                    </p>
                  </div>
                  <div className="view-switch">
                    <button
                      type="button"
                      className={view === 'list' ? 'active' : ''}
                      onClick={() => setView('list')}
                    >
                      List
                    </button>
                    <button
                      type="button"
                      className={view === 'grid' ? 'active' : ''}
                      onClick={() => setView('grid')}
                    >
                      Grid
                    </button>
                  </div>
                </div>
                {filteredDoctors.length === 0 ? (
                  <div className="empty-state">
                    <h3>No doctors found</h3>
                    <p>Try another name, specialty, or filter.</p>
                  </div>
                ) : (
                  <div
                    className={`doctor-list ${
                      view === 'grid' ? 'grid-view' : ''
                    }`}
                  >
                    {filteredDoctors.map((doctor) => (
                      <article
                        className="doctor-card"
                        key={doctor.id}
                      >
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          loading="lazy"
                        />
                        <div className="doctor-info">
                          <h3>{doctor.name}</h3>
                          <p className="specialty">
                            {doctor.specialty}
                          </p>
                          <p>🏥 {doctor.hospital}</p>
                          <p>📍 {doctor.location}</p>
                          <p>🕒 {doctor.available}</p>
                          <div className="rating">
                            ⭐ {doctor.rating.toFixed(1)} / 5
                          </div>
                        </div>
                        <button
                          type="button"
                          className="profile-button"
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          View Profile
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
        {page === 'marketplace' && (
          <section className="marketplace-page">
            <div className="market-hero">
              <h1>Healthcare Marketplace</h1>
              <p>
                Explore medical devices, personal care products, and
                first aid essentials.
              </p>
            </div>
            <div className="market-search">
              <input
                placeholder="Search healthcare products..."
                aria-label="Search healthcare products"
                value={productSearch}
                onChange={(event) =>
                  setProductSearch(event.target.value)
                }
              />
              <button
                type="button"
                className="secondary-button"
                onClick={() => setProductSearch('')}
              >
                Clear
              </button>
            </div>
            <div className="market-categories">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    productCategory === category ? 'active' : ''
                  }
                  onClick={() => setProductCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="market-title-row">
              <h2>Healthcare Products</h2>
              <span>{filteredProducts.length} products found</span>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                  >
                    <div className="product-picture">
                      {product.image}
                    </div>
                    <p className="product-category">
                      {product.category}
                    </p>
                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {product.description}
                    </p>
                    <p className="product-price">
                      ${product.price.toFixed(2)}
                      <span>${product.oldPrice.toFixed(2)}</span>
                    </p>
                    <p className="product-rating">
                      ⭐ {product.rating.toFixed(1)} / 5
                    </p>
                    <button
                      type="button"
                      className="profile-button full-width"
                      onClick={() =>
                        setMessage(
                          `${product.name} selected. Connect a checkout service to place orders.`,
                        )
                      }
                    >
                      View Product
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
        {page === 'settings' && (
          <section className="settings-page">
            <div className="settings-card">
              <h2>Account Settings</h2>
              <p>Manage your personal information.</p>
              <label htmlFor="saved-name">Full Name</label>
              <input
                id="saved-name"
                value={savedName}
                onChange={(event) =>
                  setSavedName(event.target.value)
                }
                placeholder="Enter your full name"
              />
              <label htmlFor="saved-email">Email Address</label>
              <input
                id="saved-email"
                type="email"
                value={savedEmail}
                onChange={(event) =>
                  setSavedEmail(event.target.value)
                }
                placeholder="Enter your email"
              />
              <button
                type="button"
                className="profile-button settings-save"
                onClick={() =>
                  setMessage(
                    `Settings updated for ${savedName}. This demo does not save data to a server.`,
                  )
                }
              >
                Save Settings
              </button>
            </div>
            <div className="settings-card">
              <h2>Notifications</h2>
              <p>Choose which updates you want to receive.</p>
              <label className="notification-row">
                <span>
                  Appointment Updates
                  <small>Receive appointment reminders.</small>
                </span>
                <input
                  type="checkbox"
                  checked={notifications.appointments}
                  onChange={() =>
                    toggleNotification('appointments')
                  }
                />
              </label>
              <label className="notification-row">
                <span>
                  Health Tips
                  <small>Receive useful health information.</small>
                </span>
                <input
                  type="checkbox"
                  checked={notifications.healthTips}
                  onChange={() =>
                    toggleNotification('healthTips')
                  }
                />
              </label>
              <label className="notification-row">
                <span>
                  Special Offers
                  <small>Receive product promotions.</small>
                </span>
                <input
                  type="checkbox"
                  checked={notifications.offers}
                  onChange={() =>
                    toggleNotification('offers')
                  }
                />
              </label>
            </div>
            <div className="settings-card">
              <h2>Appearance</h2>
              <p>Choose the appearance of your application.</p>
              <div className="theme-options">
                <button
                  type="button"
                  className={!darkMode ? 'selected' : ''}
                  onClick={() => setDarkMode(false)}
                >
                  ☀️ Light Mode
                </button>
                <button
                  type="button"
                  className={darkMode ? 'selected' : ''}
                  onClick={() => setDarkMode(true)}
                >
                  🌙 Dark Mode
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      {selectedDoctor && (
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDoctor(null)
            }
          }}
        >
          <section
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-profile-title"
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setSelectedDoctor(null)}
              aria-label="Close doctor profile"
            >
              ×
            </button>
            <div className="doctor-header">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
              />
              <div>
                <h2 id="doctor-profile-title">
                  {selectedDoctor.name}
                </h2>
                <p className="doctor-specialty">
                  {selectedDoctor.specialty}
                </p>
                <div className="rating">
                  ⭐ {selectedDoctor.rating.toFixed(1)} / 5
                </div>
              </div>
            </div>
            <div className="profile-details">
              <div className="profile-detail">
                <span>Hospital</span>
                <strong>{selectedDoctor.hospital}</strong>
              </div>
              <div className="profile-detail">
                <span>Location</span>
                <strong>{selectedDoctor.location}</strong>
              </div>
              <div className="profile-detail">
                <span>Gender</span>
                <strong>{selectedDoctor.gender}</strong>
              </div>
              <div className="profile-detail">
                <span>Availability</span>
                <strong>{selectedDoctor.available}</strong>
              </div>
              <div className="profile-detail">
                <span>Phone</span>
                <strong>{selectedDoctor.phone}</strong>
              </div>
              <div className="profile-detail">
                <span>Languages</span>
                <strong>{selectedDoctor.languages}</strong>
              </div>
            </div>
            <button
              type="button"
              className="book-button"
              onClick={() => handleBooking(selectedDoctor)}
            >
              Request Appointment
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
export default App