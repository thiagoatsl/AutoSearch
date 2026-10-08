# AutoSearch - Consulta de Veículos (React SPA)

Projeto 1 desenvolvido para a disciplina de **Programação Web Fullstack**.

## 📌 Informações do Projeto

- **Repositório GitHub**: [https://github.com/thiagoatsl/AutoSearch](https://github.com/thiagoatsl/AutoSearch)
- **Membros do Grupo**:
  - Augusto Thiago dos Santos Laureano

## ⚙️ Hooks e Funcionalidades Implementadas

- **Single Page Application (SPA)**: Interface reativa desenvolvida em página única com React.js em `src/App.jsx`.
- **API JSON Aberta via AJAX**: Requisições assíncronas `fetch()` em tempo real consumindo a API pública de veículos da NHTSA em `src/services/carApi.js`.
- **Hook `useReducer`**: Gerenciamento centralizado do estado global da aplicação (busca, carregamento, erros e modal).
- **Hook `useMemo`**: Filtragem otimizada da lista de modelos por categoria (`filteredCars`).
- **Hook `useRef`**: Referência e controle de foco no campo de busca (`searchInputRef`).
- **Recurso `createPortal`**: Janela modal de detalhes renderizada no elemento `#modal-root` em `src/components/Modal.jsx`.
- **Biblioteca Externa**: `lucide-react` para os ícones da interface.

## 🚀 Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Executar em modo de desenvolvimento
npm run dev
```
