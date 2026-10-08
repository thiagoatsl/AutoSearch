import React, { useMemo } from 'react';
import { Cpu, Gauge, Zap, BatteryCharging, ShieldAlert } from 'lucide-react';

export function StatsBanner({ vehicles }) {
  const stats = useMemo(() => {
    if (!vehicles || vehicles.length === 0) return { avgRange: 0, maxHp: 0, minAccel: 0, totalEvs: 0 };
    
    const evs = vehicles.filter(v => v.batteryKwh > 0);
    const avgRange = Math.round(evs.reduce((acc, v) => acc + v.range, 0) / (evs.length || 1));
    const maxHp = Math.max(...vehicles.map(v => v.hp));
    const maxHpVehicle = vehicles.find(v => v.hp === maxHp);
    const minAccel = Math.min(...vehicles.map(v => v.acceleration));
    const minAccelVehicle = vehicles.find(v => v.acceleration === minAccel);

    return {
      avgRange,
      maxHp,
      maxHpName: maxHpVehicle ? `${maxHpVehicle.brand} ${maxHpVehicle.name}` : '',
      minAccel,
      minAccelName: minAccelVehicle ? `${minAccelVehicle.brand} ${minAccelVehicle.name}` : '',
      totalEvs: evs.length
    };
  }, [vehicles]);

  return (
    <div className="stats-banner-grid">
      <div className="stat-card">
        <div className="stat-icon-wrap cyan">
          <Zap size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Potência Máxima no Banco</span>
          <h3 className="stat-value">{stats.maxHp} <span className="stat-unit">cv</span></h3>
          <p className="stat-sub">{stats.maxHpName}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap purple">
          <Gauge size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">0-100 km/h Mais Rápido</span>
          <h3 className="stat-value">{stats.minAccel} <span className="stat-unit">seg</span></h3>
          <p className="stat-sub">{stats.minAccelName}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap green">
          <BatteryCharging size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Autonomia Média EV</span>
          <h3 className="stat-value">{stats.avgRange} <span className="stat-unit">km</span></h3>
          <p className="stat-sub">Média WLTP / EPA no catálogo</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap gold">
          <Cpu size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Integração API Governamental</span>
          <h3 className="stat-value">NHTSA <span className="stat-unit">LIVE</span></h3>
          <p className="stat-sub">Decodificador VIN + Fabricantes U.S.</p>
        </div>
      </div>
    </div>
  );
}
