import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Search, Loader2, Info, AlertTriangle, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { decodeVinApi } from '../services/nhtsaApi';

const SAMPLE_VINS = [
  { vin: "5YJSA1E28HF123456", label: "Tesla Model S (EUA)" },
  { vin: "WP0AA2Y10NSA12345", label: "Porsche Taycan (Alemanha)" },
  { vin: "1FTEW1EP5NK123456", label: "Ford F-150 Lightning EV" },
  { vin: "3MW53FF05N8123456", label: "BMW Série 3 / i4 (México)" }
];

export function VinDecoder({ state, dispatch }) {
  const { vinQuery, vinResult, vinLoading, vinError } = state;
  const vinInputRef = useRef(null);

  // Auto-focus input on tab load
  useEffect(() => {
    if (vinInputRef.current) {
      vinInputRef.current.focus();
    }
  }, []);

  const handleDecode = async (overrideVin) => {
    const vinToUse = overrideVin || vinQuery;
    if (!vinToUse) return;

    dispatch({ type: 'START_VIN_FETCH' });

    try {
      const data = await decodeVinApi(vinToUse);
      dispatch({ type: 'SET_VIN_RESULT', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_VIN_ERROR', payload: err.message });
    }
  };

  const handlePresetClick = (presetVin) => {
    dispatch({ type: 'SET_VIN_QUERY', payload: presetVin });
    handleDecode(presetVin);
  };

  return (
    <div className="vin-decoder-container">
      {/* Hero Header */}
      <div className="vin-hero glass-panel">
        <div className="vin-hero-badge">
          <Globe size={16} />
          <span>NHTSA VPIC API Governamental em Tempo Real</span>
        </div>
        <h2>Decodificador Oficial de Código VIN</h2>
        <p>
          Consumo via <strong>AJAX/Fetch</strong> da API pública da <em>National Highway Traffic Safety Administration (EUA)</em>. 
          Digite qualquer código de 17 caracteres para decodificar fabricante, número de série, país da planta de fabricação e cilindrada.
        </p>

        {/* Input Box with useRef */}
        <div className="vin-search-box">
          <div className="vin-input-group">
            <ShieldCheck size={20} className="vin-icon cyan" />
            <input 
              ref={vinInputRef}
              type="text" 
              className="vin-input"
              placeholder="Digite o código VIN de 17 dígitos (ex: 5YJSA1E28HF123456)..."
              value={vinQuery}
              onChange={(e) => dispatch({ type: 'SET_VIN_QUERY', payload: e.target.value.toUpperCase() })}
              onKeyDown={(e) => e.key === 'Enter' && handleDecode()}
              maxLength={17}
            />
            <button 
              className="btn-decode"
              onClick={() => handleDecode()}
              disabled={vinLoading}
            >
              {vinLoading ? <Loader2 size={18} className="spin" /> : <Search size={18} />}
              <span>{vinLoading ? "Decodificando..." : "Decodificar VIN"}</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="vin-presets">
            <span>Exemplos para testar a API:</span>
            <div className="presets-btns">
              {SAMPLE_VINS.map(item => (
                <button 
                  key={item.vin}
                  className="preset-btn"
                  onClick={() => handlePresetClick(item.vin)}
                >
                  {item.label} ({item.vin.substring(0, 8)}...)
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {vinLoading && (
        <div className="vin-loading-card glass-panel">
          <Loader2 size={40} className="cyan spin" />
          <h3>Consultando servidores da NHTSA via AJAX...</h3>
          <p>Buscando especificações do fabricante e dados de homologação.</p>
        </div>
      )}

      {/* Error state */}
      {vinError && (
        <div className="vin-error-card glass-panel">
          <AlertTriangle size={36} className="red" />
          <h3>Erro na consulta VIN</h3>
          <p>{vinError}</p>
        </div>
      )}

      {/* Success Result View */}
      {vinResult && !vinLoading && (
        <div className="vin-results-panel glass-panel">
          <div className="vin-results-header">
            <div>
              <span className="success-tag"><CheckCircle2 size={14} /> Dados Verificados NHTSA</span>
              <h3>VIN: {vinResult.vin}</h3>
              <p className="vin-sub-header">{vinResult.make} {vinResult.model} ({vinResult.modelYear})</p>
            </div>
            <div className="vin-stamp">
              <Cpu size={24} className="cyan" />
              <span>VPIC API JSON</span>
            </div>
          </div>

          <div className="vin-specs-grid">
            <div className="vin-spec-item">
              <span className="spec-label">Fabricante Oficial</span>
              <strong className="spec-value">{vinResult.manufacturer}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Marca (Make)</span>
              <strong className="spec-value cyan-text">{vinResult.make}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Modelo (Model)</span>
              <strong className="spec-value neon-text">{vinResult.model}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Ano do Modelo</span>
              <strong className="spec-value">{vinResult.modelYear}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Categoria de Veículo</span>
              <strong className="spec-value">{vinResult.vehicleType}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">País da Fábrica</span>
              <strong className="spec-value">{vinResult.plantCountry}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Configuração do Motor</span>
              <strong className="spec-value">{vinResult.engineConfiguration}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Cilindrada (L)</span>
              <strong className="spec-value">{vinResult.displacementL}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Tipo de Tração</span>
              <strong className="spec-value">{vinResult.driveType}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Combustível / Propulsão</span>
              <strong className="spec-value">{vinResult.fuelTypePrimary}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Nível de Eletrificação</span>
              <strong className="spec-value">{vinResult.electrificationLevel}</strong>
            </div>

            <div className="vin-spec-item">
              <span className="spec-label">Número de Portas</span>
              <strong className="spec-value">{vinResult.doors}</strong>
            </div>
          </div>

          {vinResult.errorText && (
            <div className="vin-note">
              <Info size={14} />
              <span>Nota do Servidor NHTSA: {vinResult.errorText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
