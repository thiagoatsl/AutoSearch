import React from 'react';
import { Zap, Code, ShieldCheck, Cpu, Terminal, FileCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer-glass">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Zap className="logo-icon cyan" size={20} />
              <h3>AUTOTECH<span className="logo-highlight">PULSE</span></h3>
            </div>
            <p>
              Aplicação Web SPA desenvolvida para a disciplina <strong>Programação Web Fullstack</strong> (Capítulo 3 - Projeto 1 React.js).
            </p>
          </div>

          <div className="footer-col">
            <h4><ShieldCheck size={16} className="cyan inline-icon" /> API JSON Utilizada</h4>
            <ul>
              <li><strong>NHTSA VPIC API</strong> (U.S. Govt)</li>
              <li>Consumo via AJAX / <code>fetch</code></li>
              <li>Decodificador de VIN em Tempo Real</li>
              <li>Catálogo de Fabricantes & Modelos</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4><Cpu size={16} className="purple inline-icon" /> Hooks & Recursos React</h4>
            <ul>
              <li><code>useReducer</code> — Gestão de Estado Complexo</li>
              <li><code>useMemo</code> — Otimização de Filtros e Gráficos</li>
              <li><code>useRef</code> — Foco Direto nos Inputs de Busca</li>
              <li><code>createPortal</code> — Renderização de Modal</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4><Terminal size={16} className="gold inline-icon" /> Bibliotecas Externas</h4>
            <ul>
              <li><strong>Recharts</strong> — Gráficos BarChart e RadarChart</li>
              <li><strong>Lucide React</strong> — Ícones Vetoriais</li>
              <li><strong>Vite + React 19</strong> — Bundler & Runtime</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 AutoTech Pulse — Projeto Frontend React.js SPA.</p>
          <div className="footer-badges">
            <span className="tech-badge">SPA Single Page Application</span>
            <span className="tech-badge">Clean Code & React Hooks</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
