/**
 * Service for fetching live vehicle data from the U.S. Government NHTSA VPIC API via AJAX.
 * Endpoint documentation: https://vpic.nhtsa.dot.gov/api/
 */

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

/**
 * Decodes a 17-character VIN string using live NHTSA API
 * @param {string} vin - Vehicle Identification Number
 */
export async function decodeVinApi(vin) {
  const cleanVin = vin.trim().toUpperCase();
  if (!cleanVin || cleanVin.length < 5) {
    throw new Error("Por favor, digite um código VIN válido (ex: 5YJSA1E28HF123456).");
  }

  const response = await fetch(`${BASE_URL}/decodevinvalues/${encodeURIComponent(cleanVin)}?format=json`);
  if (!response.ok) {
    throw new Error(`Erro na conexão com a API NHTSA (HTTP ${response.status})`);
  }

  const data = await response.json();
  if (!data.Results || data.Results.length === 0) {
    throw new Error("Nenhum resultado retornado para o VIN informado.");
  }

  const item = data.Results[0];
  if (item.ErrorCode && item.ErrorCode !== "0" && !item.Make) {
    throw new Error(item.ErrorText || "Código VIN não reconhecido pelo banco de dados oficial.");
  }

  return {
    vin: cleanVin,
    make: item.Make || "Não informado",
    model: item.Model || "Não informado",
    modelYear: item.ModelYear || "Não informado",
    vehicleType: item.VehicleType || "Não informado",
    plantCountry: item.PlantCountry || "Não informado",
    manufacturer: item.Manufacturer || item.Make || "Não informado",
    engineConfiguration: item.EngineConfiguration || item.EngineCylinders ? `${item.EngineCylinders} cilindros` : "Não especificado",
    displacementL: item.DisplacementL ? `${item.DisplacementL}L` : "N/A",
    driveType: item.DriveType || "Não informado",
    fuelTypePrimary: item.FuelTypePrimary || "Não informado",
    electrificationLevel: item.ElectrificationLevel || "Não informado",
    doors: item.Doors || "N/A",
    errorText: item.ErrorText
  };
}

/**
 * Fetches popular manufacturers from NHTSA VPIC
 */
export async function fetchNhtsaMakes() {
  try {
    const response = await fetch(`${BASE_URL}/getallmakes?format=json`);
    if (!response.ok) throw new Error("Falha ao buscar fabricantes");
    const data = await response.json();
    // Return top subset for performance UI selection
    const makes = data.Results.map(m => m.Make_Name).filter(Boolean);
    return Array.from(new Set(makes)).slice(0, 150);
  } catch (err) {
    console.warn("Erro ao buscar marcas na NHTSA API:", err);
    return ["TESLA", "PORSCHE", "BMW", "MERCEDES-BENZ", "HYUNDAI", "FORD", "CHEVROLET", "AUDI", "RIVIAN", "LUCID"];
  }
}

/**
 * Fetches vehicle models for a specific manufacturer
 * @param {string} make 
 */
export async function fetchModelsForMakeApi(make) {
  if (!make) return [];
  const response = await fetch(`${BASE_URL}/getmodelsformake/${encodeURIComponent(make)}?format=json`);
  if (!response.ok) throw new Error("Erro ao buscar modelos do fabricante");
  const data = await response.json();
  return data.Results.map(m => ({
    id: m.Model_ID,
    name: m.Model_Name,
    make: m.Make_Name
  }));
}
