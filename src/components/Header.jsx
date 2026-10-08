import React from 'react';
import { 
  Zap, 
  Car, 
  BarChart2, 
  Search, 
  Bookmark, 
  FileText, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

export function Header({ state, dispatch, searchInputRef }) {
  const { activeTab, comparisonIds, garageIds } = state;

  const handleFocusSearch = () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' });
    setTimeout(() => {
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 50);
  };

  return (
    <header className="header-glass">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="logo-group" onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' })}>
          <div className="logo-icon-wrap">
            <Zap className="logo-icon" />
          </div>
          <div>
            <h1 className="logo-title">AUTOTECH<span className="logo-highlight">PULSE</span></h1>
            <p className="logo-subtitle">Inteligência Automotiva & Telemetria EV</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' })}
          >
            <Car size={18} />
            <span>Catálogo</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'compare' })}
          >
            <BarChart2 size={18} />
            <span>Comparador</span>
            {comparisonIds.length > 0 && (
              <span className="nav-badge neon-badge">{comparisonIds.length}</span>
            )}
          </button>

          <button 
            className={`nav-item ${activeTab === 'vin' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'vin' })}
          >
            <ShieldCheck size={18} />
            <span>Decodificador VIN (NHTSA)</span>
            <span className="live-api-tag">API LIVE</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'nhtsa' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'nhtsa' })}
          >
            <Globe size={18} />
            <span>Fabricantes NHTSA</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'garage' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'garage' })}
          >
            <Bookmark size={18} />
            <span>Garagem</span>
            {garageIds.length > 0 && (
              <span className="nav-badge gold-badge">{garageIds.length}</span>
            )}
          </button>
        </nav>

        {/* Quick Actions */}
        <div className="header-actions">
          <button className="btn-search-trigger" onClick={handleFocusSearch} title="Focar Busca (Atalho)">
            <Search size={16} />
            <span>Buscar (Ctrl+K)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
