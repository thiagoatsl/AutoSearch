import React, { useReducer, useMemo, useRef, useEffect } from 'react';
import { fetchCarsByBrand } from './services/carApi';
import { Modal } from './components/Modal';
import { Search, Car, Globe, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const SUGGESTED_BRANDS = ["Porsche", "Tesla", "BMW", "Ferrari", "Lamborghini"];

const initialState = {
  searchQuery: "Porsche",
  cars: [],
  loading: false,
  error: null,
  categoryFilter: "Todos",
  selectedCar: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cars: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, cars: [] };
    case 'SET_CATEGORY':
      return { ...state, categoryFilter: action.payload };
    case 'SELECT_CAR':
      return { ...state, selectedCar: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const searchInputRef = useRef(null);

  const handleFetchCars = async (brandToSearch) => {
    const brand = brandToSearch || state.searchQuery;
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await fetchCarsByBrand(brand);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    handleFetchCars("Porsche");
  }, []);

  const filteredCars = useMemo(() => {
    return state.cars.filter((car) => {
      return state.categoryFilter === "Todos" || car.category === state.categoryFilter;
    });
  }, [state.cars, state.categoryFilter]);

  const handleBrandClick = (brand) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: brand });
    handleFetchCars(brand);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <Car className="icon-cyan" size={26} />
          <h1>AutoSearch</h1>
        </div>
        <div className="badge-api">
          <Globe size={15} />
          <span>Consumo de API JSON (AJAX fetch)</span>
        </div>
      </header>

      <main className="main">
        <section className="search-box">
          <h2>Consultar Veículos via API</h2>
          <p>Digite uma marca para buscar os modelos cadastrados no banco de dados:</p>

          <div className="search-controls">
            <div className="input-group">
              <Search size={18} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ex: Porsche, Tesla, BMW..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleFetchCars()}
                className="input-text"
              />
            </div>
            <button
              className="btn-search"
              onClick={() => handleFetchCars()}
              disabled={state.loading}
            >
              {state.loading ? <Loader2 className="spin" size={16} /> : <Sparkles size={16} />}
              <span>{state.loading ? "Buscando..." : "Buscar na API"}</span>
            </button>
          </div>

          <div className="suggested-pills">
            <span>Marcas sugeridas:</span>
            {SUGGESTED_BRANDS.map((b) => (
              <button
                key={b}
                className={`pill ${state.searchQuery.toLowerCase() === b.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleBrandClick(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-top">
            <h3>Modelos Retornados ({filteredCars.length})</h3>

            <div className="filter-buttons">
              {["Todos", "Elétrico", "Esportivo"].map((cat) => (
                <button
                  key={cat}
                  className={`btn-filter ${state.categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {state.loading && (
            <div className="status-box">
              <Loader2 className="icon-cyan spin" size={32} />
              <p>Carregando dados da API via AJAX...</p>
            </div>
          )}

          {state.error && !state.loading && (
            <div className="status-box error">
              <AlertCircle className="icon-red" size={32} />
              <p>{state.error}</p>
            </div>
          )}

          {!state.loading && !state.error && (
            <div className="cars-grid">
              {filteredCars.map((car) => (
                <div key={car.id} className="card">
                  <img src={car.image} alt={car.name} className="card-img" />
                  <div className="card-content">
                    <span className="car-brand">{car.brand}</span>
                    <h4>{car.name}</h4>
                    <p className="car-specs">⚡ {car.hp} cv | {car.topSpeed} km/h</p>
                    <div className="card-footer">
                      <strong className="car-price">${car.priceUsd.toLocaleString()} USD</strong>
                      <button
                        className="btn-details"
                        onClick={() => dispatch({ type: 'SELECT_CAR', payload: car })}
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {state.selectedCar && (
        <Modal
          car={state.selectedCar}
          onClose={() => dispatch({ type: 'SELECT_CAR', payload: null })}
        />
      )}

      <footer className="footer">
        <p>Projeto 1 - Programação Web Fullstack | React.js SPA + AJAX (fetch)</p>
      </footer>
    </div>
  );
}
