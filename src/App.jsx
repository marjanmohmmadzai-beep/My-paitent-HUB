import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [searchError, setSearchError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchDoctorQuery, setSearchDoctorQuery] = useState('');

  // ---------- Stateهای بخش Settings ----------
  const [profileData, setProfileData] = useState({
    firstName: 'Alec',
    lastName: 'Thompson',
    gender: 'Male',
    birthMonth: 'February',
    birthDay: '1',
    birthYear: '2021',
    email: 'example@email.com',
    bloodGroup: 'A+'
  });

  const [settingsErrors, setSettingsErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setSettingsErrors({ ...settingsErrors, [name]: "" });
    setSuccessMessage("");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    let errors = {};

    if (!profileData.firstName.trim()) {
      errors.firstName = "نام نمی‌تواند خالی باشد.";
    }

    if (!profileData.lastName.trim()) {
      errors.lastName = "تخلص نمی‌تواند خالی باشد.";
    }

    if (!profileData.email.trim()) {
      errors.email = "ایمیل الزامی است.";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = "فرمت ایمیل وارد شده معتبر نیست.";
    }

    if (Object.keys(errors).length > 0) {
      setSettingsErrors(errors);
      setSuccessMessage("");
    } else {
      setSettingsErrors({});
      setSuccessMessage("اطلاعات حساب شما با موفقیت به‌روزرسانی شد!");
    }
  };

  const handleBuyClick = (name, price, img) => {
    setSelectedItem({ name, price, img });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleDoctorSearch = (e) => {
    e.preventDefault();
    if (searchDoctorQuery.trim() === '') {
      setSearchError("لطفاً نام یا تخصص پزشک را برای جستجو وارد کنید.");
    } else {
      setSearchError("");
      alert(`نتایج جستجو برای: ${searchDoctorQuery}`);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("آیا از حذف حساب کاربری خود اطمینان دارید؟")) {
      alert("حساب کاربری شما غیرفعال گردید.");
    }
  };

  return (
    <div className="app-container">
      {/* ---------------- سایدبار سمت چپ ---------------- */}
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

        <div className="download-banner">
          <h4>Download</h4>
          <p>MyPIHUB Mobile App</p>
          <div className="store-buttons">
            <button className="store-btn" onClick={() => alert("App Store")}> App Store</button>
            <button className="store-btn" onClick={() => alert("Play Store")}>🤖 Play Store</button>
          </div>
        </div>
      </aside>

      {/* ---------------- محتوای اصلی ---------------- */}
      <div className="main-content">
        
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
              
              {searchError && (
                <div style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#991b1b',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  marginTop: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}>
                  ⚠️ {searchError}
                </div>
              )}
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
                  <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300" alt="Prof Dr Maziah" className="doctor-avatar" />
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
                  <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300" alt="Dr Ahmad Faizal" className="doctor-avatar" />
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
            </div>
          </main>
        )}

        {/* ---------------- ۳. بخش SETTINGS ---------------- */}
        {activeTab === 'settings' && (
          <main className="content-body">
            <div className="settings-layout">
              <div className="settings-sidebar">
                <button className="s-nav" onClick={() => alert("Profile")}>🚀 Profile</button>
                <button className="s-nav active">📋 Basic Info</button>
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
                      <h3>{profileData.firstName} {profileData.lastName}</h3>
                      <p className="role">Patient</p>
                    </div>
                  </div>
                  <div className="switch-box">
                    <span>Switch to invisible</span>
                    <input type="checkbox" className="toggle-switch" onChange={(e) => alert(e.target.checked ? "Invisible mode ON" : "Invisible mode OFF")} />
                  </div>
                </div>

                {successMessage && (
                  <div style={{
                    backgroundColor: '#dcfce7',
                    border: '1px solid #22c55e',
                    color: '#15803d',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'right'
                  }}>
                    ✅ {successMessage}
                  </div>
                )}

                <form className="form-card" onSubmit={handleSaveProfile}>
                  <h3>Basic Info</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={profileData.firstName} 
                        onChange={handleInputChange} 
                      />
                      {settingsErrors.firstName && <span style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>{settingsErrors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={profileData.lastName} 
                        onChange={handleInputChange} 
                      />
                      {settingsErrors.lastName && <span style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>{settingsErrors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>I'm</label>
                      <select name="gender" value={profileData.gender} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Birth Date</label>
                      <div className="date-inputs">
                        <select name="birthMonth" value={profileData.birthMonth} onChange={handleInputChange}>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                        </select>
                        <select name="birthDay" value={profileData.birthDay} onChange={handleInputChange}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                        <select name="birthYear" value={profileData.birthYear} onChange={handleInputChange}>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profileData.email} 
                        onChange={handleInputChange} 
                      />
                      {settingsErrors.email && <span style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>{settingsErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label>Blood Group</label>
                      <input 
                        type="text" 
                        name="bloodGroup"
                        value={profileData.bloodGroup} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button 
                      type="submit" 
                      style={{
                        backgroundColor: '#8b5cf6',
                        color: '#fff',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      SAVE CHANGES
                    </button>
                  </div>
                </form>

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