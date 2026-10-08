import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Zap, Gauge, Battery, DollarSign, Check, ShieldCheck, Flame, Cpu, ArrowRight } from 'lucide-react';

export function VehicleModal({ vehicle, onClose, onToggleCompare, isCompared, onToggleGarage, inGarage }) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const modalContent = (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Fechar (ESC)">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="modal-hero-header">
          <img src={vehicle.image} alt={vehicle.name} className="modal-hero-img" />
          <div className="modal-hero-overlay"></div>
          <div className="modal-hero-text">
            <span className="badge badge-brand">{vehicle.brand}</span>
            <h2>{vehicle.name}</h2>
            <p className="powertrain-sub">{vehicle.powertrain} | Ano {vehicle.year}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Metrics Cards */}
          <div className="modal-metrics-grid">
            <div className="modal-metric-box">
              <Zap size={20} className="cyan" />
              <div>
                <span className="m-label">Potência</span>
                <h4 className="m-val">{vehicle.hp} cv</h4>
              </div>
            </div>

            <div className="modal-metric-box">
              <Gauge size={20} className="orange" />
              <div>
                <span className="m-label">0-100 km/h</span>
                <h4 className="m-val">{vehicle.acceleration} s</h4>
              </div>
            </div>

            <div className="modal-metric-box">
              <Battery size={20} className="green" />
              <div>
                <span className="m-label">Autonomia</span>
                <h4 className="m-val">{vehicle.range > 0 ? `${vehicle.range} km` : 'N/A'}</h4>
              </div>
            </div>

            <div className="modal-metric-box">
              <Flame size={20} className="red" />
              <div>
                <span className="m-label">Velocidade Máxima</span>
                <h4 className="m-val">{vehicle.topSpeed} km/h</h4>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="modal-section">
            <h3>Descrição & Visão Geral</h3>
            <p className="modal-desc-text">{vehicle.description}</p>
          </div>

          {/* Tech Features Badges */}
          <div className="modal-section">
            <h3>Recursos Tecnológicos & Telemetria</h3>
            <div className="features-tags-list">
              {vehicle.features && vehicle.features.map((feat, i) => (
                <div key={i} className="feature-tag">
                  <Check size={14} className="cyan" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Telemetry Details */}
          <div className="modal-details-grid">
            <div className="detail-item">
              <span>Capacidade da Bateria:</span>
              <strong>{vehicle.batteryKwh > 0 ? `${vehicle.batteryKwh} kWh` : 'Não Aplicável'}</strong>
            </div>

            <div className="detail-item">
              <span>Velocidade de Carga (DC):</span>
              <strong>{vehicle.chargingSpeedKw > 0 ? `${vehicle.chargingSpeedKw} kW Pico` : 'N/A'}</strong>
            </div>

            <div className="detail-item">
              <span>Tipo de Tração:</span>
              <strong>{vehicle.driveType} ({vehicle.powertrain})</strong>
            </div>

            <div className="detail-item">
              <span>Consumo Médio:</span>
              <strong>{vehicle.efficiencyWhKm > 0 ? `${vehicle.efficiencyWhKm} Wh/km` : 'Gasolina Premium'}</strong>
            </div>

            <div className="detail-item">
              <span>Preço de Tabela (USD):</span>
              <strong className="gold-text">${vehicle.priceUsd.toLocaleString()} USD</strong>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="modal-actions-bar">
            <button 
              className={`btn-primary ${isCompared ? 'btn-active' : ''}`}
              onClick={() => onToggleCompare(vehicle.id)}
            >
              {isCompared ? "Remover da Comparação" : "Adicionar ao Comparador"}
            </button>

            <button 
              className={`btn-secondary ${inGarage ? 'btn-active' : ''}`}
              onClick={() => onToggleGarage(vehicle.id)}
            >
              {inGarage ? "Remover da Garagem" : "Salvar na Minha Garagem"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Use React createPortal to render outside component hierarchy
  const modalRoot = document.getElementById('modal-root') || document.body;
  return ReactDOM.createPortal(modalContent, modalRoot);
}
