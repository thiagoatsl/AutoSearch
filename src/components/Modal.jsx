import React from 'react';
import ReactDOM from 'react-dom';

export function Modal({ car, onClose }) {
  if (!car) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={car.image} alt={car.name} className="modal-image" />
        
        <div className="modal-body">
          <span className="brand-badge">{car.brand}</span>
          <h2>{car.name}</h2>
          <p className="description">{car.description}</p>
          
          <div className="specs-grid">
            <div className="spec-item">
              <span>Potência:</span>
              <strong>{car.hp} cv</strong>
            </div>
            <div className="spec-item">
              <span>Velocidade Máxima:</span>
              <strong>{car.topSpeed} km/h</strong>
            </div>
            <div className="spec-item">
              <span>Preço Estimado:</span>
              <strong className="price">${car.priceUsd.toLocaleString()} USD</strong>
            </div>
          </div>
          
          <button className="btn-close-modal" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}
