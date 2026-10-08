import React, { useMemo } from 'react';
import { Bookmark, Zap, Gauge, DollarSign, Trash2, ArrowRight } from 'lucide-react';
import { VehicleCard } from './VehicleCard';

export function GarageView({ vehicles, state, dispatch }) {
  const { garageIds, comparisonIds } = state;

  const savedVehicles = useMemo(() => {
    return vehicles.filter(v => garageIds.includes(v.id));
  }, [vehicles, garageIds]);

  const garageStats = useMemo(() => {
    if (savedVehicles.length === 0) return { totalHp: 0, avgAccel: 0, totalPrice: 0 };
    const totalHp = savedVehicles.reduce((acc, v) => acc + v.hp, 0);
    const avgAccel = (savedVehicles.reduce((acc, v) => acc + v.acceleration, 0) / savedVehicles.length).toFixed(2);
    const totalPrice = savedVehicles.reduce((acc, v) => acc + v.priceUsd, 0);
    return { totalHp, avgAccel, totalPrice };
  }, [savedVehicles]);

  if (savedVehicles.length === 0) {
    return (
      <div className="empty-garage glass-panel">
        <Bookmark size={56} className="gold-text empty-icon" />
        <h2>Sua Garagem Virtual está vazia</h2>
        <p>Explore o catálogo de veículos e clique em <strong>"Garagem"</strong> nos cartões dos carros que você deseja guardar no seu perfil.</p>
        <button 
          className="btn-primary"
          onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' })}
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="garage-container">
      {/* Garage Telematics Header */}
      <div className="garage-header-panel glass-panel">
        <div className="garage-title-row">
          <div>
            <h2>Minha Garagem Virtual <span className="gold-badge">{savedVehicles.length} veículos</span></h2>
            <p>Resumo de telemetria acumulada da sua coleção dos sonhos.</p>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="garage-summary-grid">
          <div className="summary-card">
            <Zap size={22} className="cyan" />
            <div>
              <span className="s-label">Potência Total Combinada</span>
              <h3 className="s-val">{garageStats.totalHp.toLocaleString()} cv</h3>
            </div>
          </div>

          <div className="summary-card">
            <Gauge size={22} className="orange" />
            <div>
              <span className="s-label">Média 0-100 km/h</span>
              <h3 className="s-val">{garageStats.avgAccel} s</h3>
            </div>
          </div>

          <div className="summary-card">
            <DollarSign size={22} className="gold-text" />
            <div>
              <span className="s-label">Valor Total da Coleção</span>
              <h3 className="s-val">${garageStats.totalPrice.toLocaleString()} USD</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="vehicles-grid">
        {savedVehicles.map(vehicle => (
          <VehicleCard 
            key={vehicle.id}
            vehicle={vehicle}
            isCompared={comparisonIds.includes(vehicle.id)}
            inGarage={true}
            onToggleCompare={(id) => dispatch({ type: 'TOGGLE_COMPARISON', payload: id })}
            onToggleGarage={(id) => dispatch({ type: 'TOGGLE_GARAGE', payload: id })}
            onOpenDetails={(v) => dispatch({ type: 'SET_VEHICLE_MODAL', payload: v })}
          />
        ))}
      </div>
    </div>
  );
}
