import React, { useMemo } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { StatsBanner } from './StatsBanner';
import { CATEGORIES, POWERTRAINS } from '../data/vehiclesData';

export function VehicleGrid({ vehicles, state, dispatch, searchInputRef }) {
  const { 
    searchQuery, 
    selectedCategory, 
    selectedDriveType, 
    maxPrice, 
    minHp, 
    sortBy, 
    comparisonIds, 
    garageIds 
  } = state;

  // React useMemo for optimized calculation of filtered and sorted vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Search term matching brand, name, category, powertrain
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.category.toLowerCase().includes(query) ||
        vehicle.powertrain.toLowerCase().includes(query);

      // Category filter
      const matchesCategory = selectedCategory === "Todos" || vehicle.category === selectedCategory;

      // Powertrain / DriveType filter
      const matchesDrive = selectedDriveType === "Todos" || vehicle.driveType === selectedDriveType;

      // Price filter
      const matchesPrice = vehicle.priceUsd <= maxPrice;

      // Power filter
      const matchesPower = vehicle.hp >= minHp;

      return matchesQuery && matchesCategory && matchesDrive && matchesPrice && matchesPower;
    }).sort((a, b) => {
      switch (sortBy) {
        case "hp-desc":
          return b.hp - a.hp;
        case "hp-asc":
          return a.hp - b.hp;
        case "accel-asc":
          return a.acceleration - b.acceleration;
        case "range-desc":
          return b.range - a.range;
        case "price-asc":
          return a.priceUsd - b.priceUsd;
        case "price-desc":
          return b.priceUsd - a.priceUsd;
        default:
          return 0; // featured
      }
    });
  }, [vehicles, searchQuery, selectedCategory, selectedDriveType, maxPrice, minHp, sortBy]);

  return (
    <div className="catalog-container">
      {/* Dynamic Telematics Stats Banner */}
      <StatsBanner vehicles={vehicles} />

      {/* Filter and Control Bar */}
      <div className="filter-panel glass-panel">
        <div className="filter-top-row">
          {/* Search Box with useRef binding */}
          <div className="search-input-wrap">
            <Search className="search-icon" size={18} />
            <input 
              ref={searchInputRef}
              type="text" 
              className="search-input"
              placeholder="Buscar por marca, modelo ou tecnologia (ex: Porsche, Tri-Motor, Tesla)..."
              value={searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            />
            {searchQuery && (
              <button 
                className="btn-clear-search" 
                onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="sort-wrap">
            <SlidersHorizontal size={16} className="sort-icon" />
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}
            >
              <option value="featured">Destaques Telemetria</option>
              <option value="hp-desc">Maior Potência (cv)</option>
              <option value="hp-asc">Menor Potência (cv)</option>
              <option value="accel-asc">0-100 km/h Mais Rápido</option>
              <option value="range-desc">Maior Autonomia (km)</option>
              <option value="price-asc">Menor Preço ($ USD)</option>
              <option value="price-desc">Maior Preço ($ USD)</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="category-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat })}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sliders Row */}
        <div className="sliders-row">
          <div className="slider-group">
            <div className="slider-header">
              <span>Preço Máximo:</span>
              <strong className="neon-text">${maxPrice.toLocaleString()} USD</strong>
            </div>
            <input 
              type="range" 
              min="40000" 
              max="2500000" 
              step="10000"
              value={maxPrice}
              onChange={(e) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(e.target.value) })}
              className="range-slider"
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span>Potência Mínima:</span>
              <strong className="cyan-text">{minHp} cv</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1800" 
              step="50"
              value={minHp}
              onChange={(e) => dispatch({ type: 'SET_MIN_HP', payload: Number(e.target.value) })}
              className="range-slider"
            />
          </div>

          <button 
            className="btn-reset-filters"
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            title="Redefinir Filtros"
          >
            <RotateCcw size={15} />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="results-header">
        <h2>Catálogo de Telemetria <span className="count-badge">{filteredVehicles.length} veículos</span></h2>
        {comparisonIds.length > 0 && (
          <button 
            className="btn-quick-compare"
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'compare' })}
          >
            Ir para Comparador ({comparisonIds.length}) →
          </button>
        )}
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="no-results glass-panel">
          <Filter size={48} className="no-results-icon" />
          <h3>Nenhum veículo encontrado com os filtros selecionados</h3>
          <p>Tente ajustar a busca por palavra-chave ou zerar os filtros de preço e potência.</p>
          <button 
            className="btn-primary"
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="vehicles-grid">
          {filteredVehicles.map(vehicle => (
            <VehicleCard 
              key={vehicle.id}
              vehicle={vehicle}
              isCompared={comparisonIds.includes(vehicle.id)}
              inGarage={garageIds.includes(vehicle.id)}
              onToggleCompare={(id) => dispatch({ type: 'TOGGLE_COMPARISON', payload: id })}
              onToggleGarage={(id) => dispatch({ type: 'TOGGLE_GARAGE', payload: id })}
              onOpenDetails={(v) => dispatch({ type: 'SET_VEHICLE_MODAL', payload: v })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
