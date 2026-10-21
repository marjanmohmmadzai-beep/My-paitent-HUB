import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('doctor');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchDoctorQuery, setSearchDoctorQuery] = useState('');

  const handleBuyClick = (name, price, img) => {
    setSelectedItem({ name, price, img });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleDoctorSearch = (e) => {
    e.preventDefault();
    if(searchDoctorQuery.trim() === '') {
      alert("لطفاً نام یا تخصص پزشک را برای جستجو وارد کنید.");
    } else {
      alert(`نتایج جستجو برای: "${searchDoctorQuery}"`);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("آیا از حذف حساب کاربری خود اطمینان دارید؟")) {
      alert("حساب کاربری شما غیرفعال گردید.");
    }
  };

  return (
    <div className="app-container">
      {/* ---------------- سایدبار سمت چپ (Sidebar) ---------------- */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">M</div>
          <div>
            <h3 className="brand-title">MyPatientHUB</h3>
            <p className="brand-sub">Healthcare Platform</p>
          </div>
        </div>

        <ul className="nav-menu">
          <li className="nav-item" onClick={() => alert("Dashboard")}>
            <span className="nav-icon">🔲</span> Dashboard
          </li>
          <li className="nav-item" onClick={() => alert("Appointments")}>
            <span className="nav-icon">📅</span> Appointments
          </li>
          <li 
            className={`nav-item ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctor')}
          >
            <span className="nav-icon">🩺</span> Find Doctor
          </li>
          <li className="nav-item" onClick={() => alert("Find Clinic")}>
            <span className="nav-icon">🏥</span> Find Clinic
          </li>
          <li className="nav-item" onClick={() => alert("Chat")}>
            <span className="nav-icon">💬</span> Chat
          </li>
          <li 
            className={`nav-item ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            <span className="nav-icon">🛍️</span> Find MarketPlace
          </li>
          <li className="nav-item" onClick={() => alert("Find Pharmacy")}>
            <span className="nav-icon">💊</span> Find Pharmacy
          </li>
          <li className="nav-item" onClick={() => alert("My Dependents")}>
            <span className="nav-icon">👥</span> My Dependents
          </li>
          <li className="nav-item" onClick={() => alert("My Account")}>
            <span className="nav-icon">⚙️</span> My Account
          </li>
          <li 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">🔧</span> Settings
          </li>
        </ul>

        {/* بنر دانلود اپلیکیشن */}
        <div className="download-banner">
          <h4>Download</h4>
          <p>MyPIHUB Mobile App</p>
          <div className="store-buttons">
            <button className="store-btn" onClick={() => alert("App Store")}> App Store</button>
            <button className="store-btn" onClick={() => alert("Play Store")}>🤖 Play Store</button>
          </div>
        </div>
      </aside>

      {/* ---------------- محتوای اصلی (Main Content) ---------------- */}
      <div className="main-content">
        
        {/* هدر بالای صفحه */}
        <header className="top-header">
          <div className="breadcrumb">
            🏠 / {activeTab === 'doctor' ? 'Find a Doctor' : activeTab === 'marketplace' ? 'Marketplace' : 'Accountsetting'}
            <h2 className="header-page-title">
              {activeTab === 'doctor' ? 'Find a Doctor' : activeTab === 'marketplace' ? 'Marketplace' : 'Accountsetting'}
            </h2>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Type here..." />
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={() => alert("Logged out")}>➡️ Log out</button>
            <span className="header-icon" onClick={() => alert("Settings")}>⚙️</span>
            <span className="header-icon" onClick={() => alert("Notifications")}>🔔</span>
          </div>
        </header>

        {/* ---------------- ۱. بخش FIND DOCTOR ---------------- */}
        {activeTab === 'doctor' && (
          <main className="content-body">
            <div className="doctor-hero-banner">
              <h2>Find a Doctor</h2>
              <p>Search Doctors and schedule an appointment</p>
              <form className="hero-search-bar" onSubmit={handleDoctorSearch}>
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search a doctor by name, specialty" 
                  value={searchDoctorQuery}
                  onChange={(e) => setSearchDoctorQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">SEARCH</button>
              </form>
            </div>

            <div className="view-toggle">
              <button className="toggle-btn" onClick={() => alert("Map View")}>🗺️ Map</button>
              <button className="toggle-btn active-purple">☰ List</button>
            </div>

            <div className="doctor-layout">
              <div className="filter-card">
                <h4>Filter By</h4>
                <div className="filter-group">
                  <label>Specialty</label>
                  <select><option>All</option></select>
                </div>
                <div className="filter-group">
                  <label>Gender</label>
                  <select><option>All</option></select>
                </div>
                <div className="filter-group">
                  <label>Condition</label>
                  <select><option>All</option></select>
                </div>
                <div className="filter-group">
                  <label>Providers Who Treat</label>
                  <div className="checkbox-group">
                    <label><input type="checkbox" /> All Ages</label>
                    <label><input type="checkbox" /> Children</label>
                    <label><input type="checkbox" /> Adults</label>
                  </div>
                </div>
              </div>

              <div className="doctors-list">
                <div className="list-header">
                  <span>4 doctor(s) found</span>
                  <div className="sort-buttons">
                    <button onClick={() => alert("Sorted by Name")}>NAME</button>
                    <button onClick={() => alert("Sorted by Specialty")}>SPECIALTY</button>
                  </div>
                </div>

                <div className="doctor-card">
                  <img 
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300" 
                    alt="Prof Dr Maziah" 
                    className="doctor-avatar"
                  />
                  <div className="doctor-details">
                    <h3>PROF. DR. MAZIAH Binti Khairullah</h3>
                    <p className="specialty">Obstetrics and Gynaecology</p>
                    <p className="sub-title">Visiting Consultant</p>
                    <p className="info">📍 Lot 193, 194, Jalan Nilai Square 6, Bandar Baru Nilai, 71800 Nilai, Negeri Sembilan Malaysia</p>
                    <p className="info">📞 +60126504921</p>
                    <p className="info">🌐 English, Malay</p>
                    <button className="available-btn" onClick={() => alert("Appointment Booked!")}>NEXT AVAILABLE: TUESDAY, MARCH 22</button>
                  </div>
                </div>

                <div className="doctor-card">
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300" 
                    alt="Dr Ahmad Faizal" 
                    className="doctor-avatar"
                  />
                  <div className="doctor-details">
                    <h3>Dr. Ahmad Faizal bin Ismail</h3>
                    <p className="specialty">Cardiology</p>
                    <p className="sub-title">Senior Consultant</p>
                    <p className="info">📍 Jalan Ampang, Kuala Lumpur, 50450, Malaysia</p>
                    <p className="info">📞 +60123456789</p>
                    <p className="info">🌐 English, Malay, Arabic</p>
                    <button className="available-btn" onClick={() => alert("Appointment Booked!")}>NEXT AVAILABLE: WEDNESDAY, MARCH 23</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ---------------- ۲. بخش FIND MARKETPLACE ---------------- */}
        {activeTab === 'marketplace' && (
          <main className="content-body">
            <h2 className="section-heading">Search Marketplaces and order what you need</h2>

            <div className="cards-grid">
              <div className="market-card">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" alt="Food Panda" className="food-img" />
                <div className="market-card-body">
                  <h4>Food Panda</h4>
                  <p>As and when through a cheap amount of an and local restaurants.</p>
                  <div className="card-footer">
                    <button className="buy-btn" onClick={() => handleBuyClick("Food Panda", "5 RM", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400")}>BUY NOW</button>
                    <span className="price-tag">5 RM</span>
                  </div>
                </div>
              </div>

              <div className="market-card">
                <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" alt="Grab Food" className="food-img" />
                <div className="market-card-body">
                  <h4>Grab Food</h4>
                  <p>Meal is something that every person has five so and treat every human...</p>
                  <div className="card-footer">
                    <button className="buy-btn" onClick={() => handleBuyClick("Grab Food", "10 RM", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400")}>BUY NOW</button>
                    <span className="price-tag">10 RM</span>
                  </div>
                </div>
              </div>

              <div className="market-card">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" alt="Deliveroo" className="food-img" />
                <div className="market-card-body">
                  <h4>Deliveroo</h4>
                  <p>Different people have different tastes and different kinds of people.</p>
                  <div className="card-footer">
                    <button className="buy-btn" onClick={() => handleBuyClick("Deliveroo", "15 RM", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400")}>BUY NOW</button>
                    <span className="price-tag">15 RM</span>
                  </div>
                </div>
              </div>

              <div className="market-card">
                <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400" alt="Minimalist" className="food-img" />
                <div className="market-card-body">
                  <h4>Minimalist</h4>
                  <p>Different people have different tastes and different kinds of people.</p>
                  <div className="card-footer">
                    <button className="buy-btn" onClick={() => handleBuyClick("Minimalist", "20 RM", "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400")}>BUY NOW</button>
                    <span className="price-tag">20 RM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-card">
              <h4>Other results for healthy diet search</h4>
              <div className="table-search-row">
                <select className="small-select"><option>1</option></select>
                <input type="text" placeholder="enters zip code" className="table-input" />
                <button className="table-search-btn" onClick={() => alert("Searching zip code...")}>🔍 Search</button>
              </div>

              <table className="custom-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>TYPE</th>
                    <th>DELIVERED</th>
                    <th>POPULARITY</th>
                    <th>RATING</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🥗 Healthy Diet</td>
                    <td>Food</td>
                    <td>Delivered</td>
                    <td>8</td>
                    <td>1</td>
                    <td><strong>10 RM</strong> <span className="small-code">243234234</span></td>
                  </tr>
                  <tr>
                    <td>🍔 Food panda</td>
                    <td>Food</td>
                    <td>Delivered</td>
                    <td>10</td>
                    <td>1</td>
                    <td><strong>15 RM</strong> <span className="small-code">983323423</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        )}

        {/* ---------------- ۳. بخش SETTINGS ---------------- */}
        {activeTab === 'settings' && (
          <main className="content-body">
            <div className="settings-layout">
              <div className="settings-sidebar">
                <button className="s-nav" onClick={() => alert("Profile")}>🚀 Profile</button>
                <button className="s-nav active" onClick={() => alert("Basic Info")}>📋 Basic Info</button>
                <button className="s-nav" onClick={() => alert("Change Password")}>📦 Change Password</button>
                <button className="s-nav" onClick={() => alert("2FA")}>🏪 2FA</button>
                <button className="s-nav" onClick={() => alert("Sessions")}>🔧 Sessions</button>
                <button className="s-nav" onClick={() => alert("Delete Account")}>💳 Delete Account</button>
              </div>

              <div className="settings-content">
                <div className="user-profile-card">
                  <div className="user-profile-info">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" 
                      alt="Azam Shah" 
                      className="profile-avatar"
                    />
                    <div>
                      <h3>Azam Shah</h3>
                      <p className="role">Patient</p>
                    </div>
                  </div>
                  <div className="switch-box">
                    <span>Switch to invisible</span>
                    <input type="checkbox" className="toggle-switch" onChange={(e) => alert(e.target.checked ? "Invisible mode ON" : "Invisible mode OFF")} />
                  </div>
                </div>

                <div className="form-card">
                  <h3>Basic Info</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" defaultValue="Alec" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" defaultValue="Thompson" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>I'm</label>
                      <select><option>Male</option><option>Female</option></select>
                    </div>
                    <div className="form-group">
                      <label>Birth Date</label>
                      <div className="date-inputs">
                        <select><option>February</option></select>
                        <select><option>1</option></select>
                        <select><option>2021</option></select>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="example@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Blood Group</label>
                      <input type="text" defaultValue="A+" />
                    </div>
                  </div>
                </div>

                <div className="danger-card">
                  <h4>Delete Account</h4>
                  <p className="danger-sub">Once you delete your account, there is no going back. Please be certain.</p>
                  <div className="danger-actions">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Confirm</span>
                      <small>I want to delete my account.</small>
                    </label>
                    <div className="danger-btns">
                      <button className="btn-deactivate" onClick={() => alert("Deactivated!")}>DEACTIVATE</button>
                      <button className="btn-delete" onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

      </div>

      {/* ---------------- پاپ‌آپ سفارشی (Modal) ---------------- */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.img} alt={selectedItem.name} className="modal-img" />
            <h3>{selectedItem.name}</h3>
            <p style={{fontSize: '13px', color: '#64748b'}}>Your healthy order is ready to process.</p>
            <div className="modal-price">Total Price: <strong>{selectedItem.price}</strong></div>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={() => { alert("Order Confirmed Successfully!"); closeModal(); }}>Confirm Order</button>
              <button className="close-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}