import React from 'react';
import { Shield, Sun, Phone, FileText, BookOpen } from 'lucide-react';
import './styles/globals.css';
import { Mission } from './components/Mission';
import { Features } from './components/Features';
import { GuidesBlog } from './components/GuidesBlog';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <Shield className="logo-icon" fill="#0066FF" color="#0066FF" />
            <span>RightsUp</span>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="nav-link"><FileText size={16} style={{display: 'inline', marginRight: '4px'}}/> Report</a>
            <a href="#" className="nav-link">ToS Decoder</a>
            <a href="#" className="nav-link"><BookOpen size={16} style={{display: 'inline', marginRight: '4px'}}/> Resources</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-primary">
              <Phone size={16} />
              Get Help Now
            </button>
            <Sun size={20} color="#6B7280" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <Mission />
        <Features />
        <GuidesBlog />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div>
            <div className="logo-container" style={{ marginBottom: '1rem' }}>
              <Shield className="logo-icon" fill="#0066FF" color="#0066FF" />
              <span>RightsUp</span>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '300px' }}>
              Empowering Filipino youth to understand, exercise, and defend their digital rights. 
              Free tools for reporting violations and understanding your online protections.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Tools</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.9rem' }}>Smart Report Builder</a></li>
              <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.9rem' }}>ToS Decoder</a></li>
              <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.9rem' }}>Resource Directory</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Emergency</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>NBI Cybercrime</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>(02) 8523-8231</div>
              </li>
              <li>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Bantay Bata 163</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>163</div>
              </li>
              <li>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Mental Health</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>1553</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>Made with ❤️ by PUP++ for Hack the Flood</div>
          <div>Privacy-first. No login required. Your data stays yours.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
