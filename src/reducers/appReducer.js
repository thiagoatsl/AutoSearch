export const INITIAL_STATE = {
  searchQuery: "",
  selectedCategory: "Todos",
  selectedDriveType: "Todos",
  maxPrice: 2500000,
  minHp: 0,
  sortBy: "featured",
  comparisonIds: ["v1", "v2"],
  garageIds: ["v1"],
  activeTab: "catalog",
  selectedVehicleModal: null,
  
  // Live VIN API state
  vinQuery: "5YJSA1E28HF123456",
  vinResult: null,
  vinLoading: false,
  vinError: null,

  // Live NHTSA Manufacturers state
  selectedMake: "TESLA",
  nhtsaMakes: [],
  nhtsaModels: [],
  nhtsaModelsLoading: false,
  nhtsaError: null
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "SET_DRIVE_TYPE":
      return { ...state, selectedDriveType: action.payload };

    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };

    case "SET_MIN_HP":
      return { ...state, minHp: action.payload };

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };

    case "RESET_FILTERS":
      return {
        ...state,
        searchQuery: "",
        selectedCategory: "Todos",
        selectedDriveType: "Todos",
        maxPrice: 2500000,
        minHp: 0,
        sortBy: "featured"
      };

    case "TOGGLE_COMPARISON": {
      const id = action.payload;
      const exists = state.comparisonIds.includes(id);
      let newIds;
      if (exists) {
        newIds = state.comparisonIds.filter(item => item !== id);
      } else {
        if (state.comparisonIds.length >= 4) {
          alert("Você pode comparar no máximo 4 veículos simultaneamente.");
          return state;
        }
        newIds = [...state.comparisonIds, id];
      }
      return { ...state, comparisonIds: newIds };
    }

    case "CLEAR_COMPARISON":
      return { ...state, comparisonIds: [] };

    case "TOGGLE_GARAGE": {
      const id = action.payload;
      const exists = state.garageIds.includes(id);
      const newGarage = exists
        ? state.garageIds.filter(item => item !== id)
        : [...state.garageIds, id];
      return { ...state, garageIds: newGarage };
    }

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "SET_VEHICLE_MODAL":
      return { ...state, selectedVehicleModal: action.payload };

    // VIN API Actions
    case "SET_VIN_QUERY":
      return { ...state, vinQuery: action.payload };

    case "START_VIN_FETCH":
      return { ...state, vinLoading: true, vinError: null, vinResult: null };

    case "SET_VIN_RESULT":
      return { ...state, vinLoading: false, vinResult: action.payload, vinError: null };

    case "SET_VIN_ERROR":
      return { ...state, vinLoading: false, vinError: action.payload };

    // NHTSA Makes/Models Actions
    case "SET_NHTSA_MAKES":
      return { ...state, nhtsaMakes: action.payload };

    case "SET_SELECTED_MAKE":
      return { ...state, selectedMake: action.payload };

    case "START_NHTSA_MODELS_FETCH":
      return { ...state, nhtsaModelsLoading: true, nhtsaError: null };

    case "SET_NHTSA_MODELS":
      return { ...state, nhtsaModelsLoading: false, nhtsaModels: action.payload };

    case "SET_NHTSA_ERROR":
      return { ...state, nhtsaModelsLoading: false, nhtsaError: action.payload };

    default:
      return state;
  }
}
