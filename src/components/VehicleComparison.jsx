import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { BarChart2, Trash2, Plus, Zap, Gauge, Battery, DollarSign, Flame } from 'lucide-react';

const RADAR_COLORS = ['#00f2fe', '#ff4e50', '#00e676', '#ffb300'];

export function VehicleComparison({ vehicles, state, dispatch }) {
  const { comparisonIds } = state;

  const selectedVehicles = useMemo(() => {
    return vehicles.filter(v => comparisonIds.includes(v.id));
  }, [vehicles, comparisonIds]);

  // Format data for Recharts Bar Chart
  const barChartData = useMemo(() => {
    return selectedVehicles.map(v => ({
      name: `${v.brand} ${v.name}`,
      Potência: v.hp,
      "Velocidade Máxima": v.topSpeed,
      "Autonomia (km)": v.range,
      "Aceleração x10": Math.round((5 - v.acceleration) * 200) // normalized inverse scale for chart visual
    }));
  }, [selectedVehicles]);

  // Format data for Recharts Radar Chart
  const radarChartData = useMemo(() => {
    const metrics = [
      { key: "hp", name: "Potência (cv)", max: 2000 },
      { key: "topSpeed", name: "Vel. Máx (km/h)", max: 450 },
      { key: "range", name: "Autonomia (km)", max: 750 },
      { key: "batteryKwh", name: "Bateria (kWh)", max: 140 },
      { key: "accelerationScore", name: "Aceleração 0-100", max: 100 }
    ];

    return metrics.map(m => {
      const entry = { metric: m.name };
      selectedVehicles.forEach((v, index) => {
        let val = v[m.key];
        if (m.key === "accelerationScore") {
          val = Math.max(0, Math.round((5 - v.acceleration) * 20)); // scale 0-100
        }
        entry[`v_${v.id}`] = Math.round((val / m.max) * 100);
      });
      return entry;
    });
  }, [selectedVehicles]);

  if (selectedVehicles.length === 0) {
    return (
      <div className="empty-comparison glass-panel">
        <BarChart2 size={56} className="empty-icon cyan" />
        <h2>Nenhum veículo selecionado para comparação</h2>
        <p>Acesse o catálogo e clique no botão <strong>"Comparar"</strong> nos cartões dos veículos desejados para visualizar gráficos interativos de telemetria.</p>
        <button 
          className="btn-primary"
          onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' })}
        >
          Voltar para o Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="comparison-container">
      {/* Comparison Header */}
      <div className="comparison-header-panel glass-panel">
        <div className="comp-title-row">
          <div>
            <h2>Matriz de Comparação de Telemetria</h2>
            <p>Análise comparativa usando <strong>Recharts</strong> para telemetria vetorial, dinâmica de aceleração e autonomia.</p>
          </div>
          <button 
            className="btn-clear-comp"
            onClick={() => dispatch({ type: 'CLEAR_COMPARISON' })}
          >
            <Trash2 size={16} />
            <span>Limpar Comparação</span>
          </button>
        </div>

        {/* Selected Vehicles Pills */}
        <div className="selected-vehicles-list">
          {selectedVehicles.map((v, idx) => (
            <div key={v.id} className="selected-v-chip" style={{ borderLeftColor: RADAR_COLORS[idx] }}>
              <img src={v.image} alt={v.name} className="v-chip-img" />
              <div>
                <strong>{v.brand} {v.name}</strong>
                <p>{v.hp} cv | {v.acceleration}s 0-100</p>
              </div>
              <button 
                className="btn-chip-remove"
                onClick={() => dispatch({ type: 'TOGGLE_COMPARISON', payload: v.id })}
              >
                ×
              </button>
            </div>
          ))}

          {selectedVehicles.length < 4 && (
            <button 
              className="btn-add-more-comp"
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'catalog' })}
            >
              <Plus size={16} />
              <span>Adicionar outro (+{4 - selectedVehicles.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Charts Section (Recharts) */}
      <div className="charts-grid">
        {/* Bar Chart */}
        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3><Zap size={18} className="cyan" /> Comparativo de Potência & Velocidade (cv vs km/h)</h3>
            <span className="chart-tag">Recharts BarChart</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="name" stroke="#a0aec0" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
                <YAxis stroke="#a0aec0" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101726', borderColor: '#00f2fe', borderRadius: '8px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                <Bar dataKey="Potência" fill="#00f2fe" radius={[6, 6, 0, 0]} name="Potência (cv)" />
                <Bar dataKey="Velocidade Máxima" fill="#ff4e50" radius={[6, 6, 0, 0]} name="Vel. Máxima (km/h)" />
                <Bar dataKey="Autonomia (km)" fill="#00e676" radius={[6, 6, 0, 0]} name="Autonomia (km)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3><Gauge size={18} className="purple" /> Perfil de Performance Multiaxial (Radar 0-100%)</h3>
            <span className="chart-tag">Recharts RadarChart</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarChartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" stroke="#e2e8f0" tick={{ fill: '#e2e8f0', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#a0aec0" />
                {selectedVehicles.map((v, idx) => (
                  <Radar
                    key={v.id}
                    name={`${v.brand} ${v.name}`}
                    dataKey={`v_${v.id}`}
                    stroke={RADAR_COLORS[idx]}
                    fill={RADAR_COLORS[idx]}
                    fillOpacity={0.3}
                  />
                ))}
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101726', borderColor: '#4facfe', borderRadius: '8px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Side-by-Side Specs Matrix Table */}
      <div className="specs-table-card glass-panel">
        <h3>Tabela Comparativa de Telemetria Detalhada</h3>
        <div className="table-responsive">
          <table className="specs-table">
            <thead>
              <tr>
                <th>Especificação</th>
                {selectedVehicles.map(v => (
                  <th key={v.id}>
                    <div className="th-vehicle">
                      <img src={v.image} alt={v.name} className="th-img" />
                      <span>{v.brand} {v.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Zap size={14} className="cyan inline-icon" /> Potência Total</td>
                {selectedVehicles.map(v => (
                  <td key={v.id} className="highlight-cell">{v.hp} cv</td>
                ))}
              </tr>
              <tr>
                <td><Gauge size={14} className="orange inline-icon" /> 0-100 km/h</td>
                {selectedVehicles.map(v => (
                  <td key={v.id} className="highlight-cell">{v.acceleration} segundos</td>
                ))}
              </tr>
              <tr>
                <td><Flame size={14} className="red inline-icon" /> Velocidade Máxima</td>
                {selectedVehicles.map(v => (
                  <td key={v.id}>{v.topSpeed} km/h</td>
                ))}
              </tr>
              <tr>
                <td><Battery size={14} className="green inline-icon" /> Autonomia Total</td>
                {selectedVehicles.map(v => (
                  <td key={v.id}>{v.range > 0 ? `${v.range} km` : 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <td>Bateria / Capacidade</td>
                {selectedVehicles.map(v => (
                  <td key={v.id}>{v.batteryKwh > 0 ? `${v.batteryKwh} kWh` : 'Motor ICE Atmosférico'}</td>
                ))}
              </tr>
              <tr>
                <td>Carregamento Máximo</td>
                {selectedVehicles.map(v => (
                  <td key={v.id}>{v.chargingSpeedKw > 0 ? `${v.chargingSpeedKw} kW` : 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <td>Tração / Drive Type</td>
                {selectedVehicles.map(v => (
                  <td key={v.id}>{v.driveType} ({v.powertrain})</td>
                ))}
              </tr>
              <tr>
                <td><DollarSign size={14} className="gold inline-icon" /> Preço Estimado</td>
                {selectedVehicles.map(v => (
                  <td key={v.id} className="gold-text">${v.priceUsd.toLocaleString()} USD</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
