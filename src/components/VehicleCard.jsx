import React from 'react';
import { Zap, Gauge, Battery, Shield, Plus, Check, Bookmark, Eye, Flame } from 'lucide-react';

export function VehicleCard({ vehicle, isCompared, inGarage, onToggleCompare, onToggleGarage, onOpenDetails }) {
  return (
    <div className="vehicle-card glass-panel">
      {/* Top Image Container */}
      <div className="card-image-wrap">
        <img src={vehicle.image} alt={vehicle.name} loading="lazy" className="card-image" />
        <div className="card-image-overlay"></div>
        
        {/* Badges */}
        <div className="card-badges-top">
          <span className="badge badge-brand">{vehicle.brand}</span>
          <span className="badge badge-category">{vehicle.category}</span>
        </div>

        {/* Price tag */}
        <div className="card-price-tag">
          ${vehicle.priceUsd.toLocaleString()} USD
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-header-info">
          <h3 className="vehicle-title">{vehicle.name}</h3>
          <p className="vehicle-powertrain">{vehicle.powertrain}</p>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="telemetry-grid">
          <div className="telemetry-item">
            <span className="tel-label"><Zap size={13} className="tel-icon cyan" /> Potência</span>
            <span className="tel-value">{vehicle.hp} <small>cv</small></span>
          </div>

          <div className="telemetry-item">
            <span className="tel-label"><Gauge size={13} className="tel-icon orange" /> 0-100 km/h</span>
            <span className="tel-value">{vehicle.acceleration} <small>s</small></span>
          </div>

          <div className="telemetry-item">
            <span className="tel-label"><Battery size={13} className="tel-icon green" /> Autonomia</span>
            <span className="tel-value">{vehicle.range > 0 ? `${vehicle.range} km` : 'N/A'}</span>
          </div>

          <div className="telemetry-item">
            <span className="tel-label"><Flame size={13} className="tel-icon red" /> Vel. Máxima</span>
            <span className="tel-value">{vehicle.topSpeed} <small>km/h</small></span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="card-actions-row">
          <button 
            className={`btn-card-action btn-compare ${isCompared ? 'active' : ''}`}
            onClick={() => onToggleCompare(vehicle.id)}
            title={isCompared ? "Remover da comparação" : "Adicionar à comparação"}
          >
            {isCompared ? <Check size={16} /> : <Plus size={16} />}
            <span>{isCompared ? "Comparando" : "Comparar"}</span>
          </button>

          <button 
            className={`btn-card-action btn-garage ${inGarage ? 'active' : ''}`}
            onClick={() => onToggleGarage(vehicle.id)}
            title={inGarage ? "Remover da Garagem" : "Salvar na Garagem"}
          >
            <Bookmark size={16} />
            <span>{inGarage ? "Salvo" : "Garagem"}</span>
          </button>

          <button 
            className="btn-card-action btn-details"
            onClick={() => onOpenDetails(vehicle)}
            title="Ver Telemetria Completa"
          >
            <Eye size={16} />
            <span>Detalhes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
