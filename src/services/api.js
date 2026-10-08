// Serviço AJAX simples usando fetch() para consumir a API JSON aberta da NHTSA
export async function buscarDadosVin(vin) {
  const vinLimpo = vin.trim().toUpperCase();
  if (!vinLimpo) {
    throw new Error("Digite um código VIN válido.");
  }

  // Requisição AJAX nativa com fetch API
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${encodeURIComponent(vinLimpo)}?format=json`;
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Erro de comunicação com o servidor da API.");
  }

  const dados = await resposta.json();
  
  if (!dados.Results || dados.Results.length === 0) {
    throw new Error("Nenhum veículo encontrado para este VIN.");
  }

  const item = dados.Results[0];

  // Retorna um objeto formatado e simples
  return {
    vin: vinLimpo,
    marca: item.Make || "Não informado",
    modelo: item.Model || "Não informado",
    ano: item.ModelYear || "Não informado",
    fabricante: item.Manufacturer || item.Make || "Não informado",
    pais: item.PlantCountry || "Não informado",
    tipoVeiculo: item.VehicleType || "Não informado",
    motor: item.DisplacementL ? `${item.DisplacementL}L` : "Elétrico / Não especificado"
  };
}
