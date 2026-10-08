import React, { useEffect } from 'react';
import { Globe, Loader2, Car, Search, Building2 } from 'lucide-react';
import { fetchNhtsaMakes, fetchModelsForMakeApi } from '../services/nhtsaApi';

const POPULAR_MAKES = [
  "TESLA", "PORSCHE", "BMW", "MERCEDES-BENZ", "HYUNDAI", 
  "FORD", "CHEVROLET", "AUDI", "RIVIAN", "LUCID", "FERRARI", "LAMBORGHINI"
];

export function NhtsaExplorer({ state, dispatch }) {
  const { selectedMake, nhtsaModels, nhtsaModelsLoading, nhtsaError } = state;

  useEffect(() => {
    async function loadModels() {
      dispatch({ type: 'START_NHTSA_MODELS_FETCH' });
      try {
        const models = await fetchModelsForMakeApi(selectedMake);
        dispatch({ type: 'SET_NHTSA_MODELS', payload: models });
      } catch (err) {
        dispatch({ type: 'SET_NHTSA_ERROR', payload: err.message });
      }
    }

    loadModels();
  }, [selectedMake, dispatch]);

  return (
    <div className="nhtsa-explorer-container">
      <div className="explorer-hero glass-panel">
        <div className="hero-tag">
          <Globe size={16} />
          <span>Explorador de Modelos Homologados nos EUA</span>
        </div>
        <h2>Explorador de Fabricantes & Modelos NHTSA</h2>
        <p>
          Consulte em tempo real a lista completa de modelos cadastrados pelo departamento de trânsito dos Estados Unidos para cada fabricante mundial.
        </p>

        {/* Popular Makes Quick Selector */}
        <div className="makes-selector">
          <span>Selecione uma marca para consultar os modelos via API:</span>
          <div className="makes-pills">
            {POPULAR_MAKES.map(make => (
              <button 
                key={make}
                className={`make-pill ${selectedMake === make ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_SELECTED_MAKE', payload: make })}
              >
                <Building2 size={14} />
                <span>{make}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="explorer-results-header">
        <h3>
          Modelos Homologados para <span className="neon-text">{selectedMake}</span>
        </h3>
        <span className="models-count">
          {nhtsaModelsLoading ? "Carregando..." : `${nhtsaModels.length} modelos registrados`}
        </span>
      </div>

      {/* Loading state */}
      {nhtsaModelsLoading && (
        <div className="nhtsa-loading glass-panel">
          <Loader2 size={36} className="cyan spin" />
          <p>Conectando ao banco de dados da NHTSA para {selectedMake}...</p>
        </div>
      )}

      {/* Error state */}
      {nhtsaError && !nhtsaModelsLoading && (
        <div className="nhtsa-error glass-panel">
          <p>Não foi possível carregar os modelos para {selectedMake}: {nhtsaError}</p>
        </div>
      )}

      {/* Models Grid */}
      {!nhtsaModelsLoading && !nhtsaError && (
        <div className="nhtsa-models-grid">
          {nhtsaModels.map((item, index) => (
            <div key={`${item.id}-${index}`} className="nhtsa-model-card glass-panel">
              <div className="model-card-icon">
                <Car size={20} className="cyan" />
              </div>
              <div className="model-card-info">
                <h4>{item.name}</h4>
                <p>Fabricante: {item.make}</p>
                <small className="model-id">ID NHTSA #{item.id}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
