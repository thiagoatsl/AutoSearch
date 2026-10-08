const CAR_IMAGES = {
  PORSCHE: [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
  ],
  TESLA: [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80"
  ],
  BMW: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
  ],
  FERRARI: [
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
  ],
  LAMBORGHINI: [
    "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80"
  ],
  DEFAULT: [
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
  ]
};

function getCarImage(brand, index) {
  const key = (brand || "").toUpperCase();
  const list = CAR_IMAGES[key] || CAR_IMAGES.DEFAULT;
  return list[index % list.length];
}

// Requisição AJAX para consumir modelos da marca informada via API publica NHTSA
export async function fetchCarsByBrand(brand) {
  const query = brand.trim().toUpperCase();
  if (!query) {
    throw new Error("Informe o nome de uma marca para pesquisar.");
  }

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(query)}?format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro na conexão com a API de veículos.");
  }

  const data = await response.json();

  if (!data.Results || data.Results.length === 0) {
    throw new Error(`Nenhum modelo encontrado para a marca "${brand}".`);
  }

  return data.Results.slice(0, 8).map((item, index) => ({
    id: item.Model_ID || `${query}-${index}`,
    name: item.Model_Name,
    brand: item.Make_Name,
    hp: 400 + ((index * 85) % 550),
    topSpeed: 240 + ((index * 15) % 110),
    priceUsd: 55000 + (index * 20000),
    category: index % 2 === 0 ? "Elétrico" : "Esportivo",
    image: getCarImage(item.Make_Name, index),
    description: `Modelo ${item.Model_Name} da marca ${item.Make_Name}, retornado dinamicamente via consulta de API.`
  }));
}
