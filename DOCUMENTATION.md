# Documentação do Projeto

**Disciplina**: Programação Web Fullstack  
**Capítulo 3 - Projeto 1**: Frontend SPA com React.js e AJAX  
**Aplicação**: AutoSearch — Busca de Veículos e Especificações  

---

## 1. Descrição do Projeto
O trabalho consiste em uma aplicação web desenvolvida no conceito SPA (Single Page Application) utilizando **React.js**. A aplicação permite pesquisar marcas e modelos de veículos em tempo real através de requisições assíncronas (AJAX / `fetch API`) consumindo dados da API pública de veículos.

---

## 2. Requisitos da Disciplina Atendidos

| Requisito | Descrição da Implementação | Arquivo Relacionado |
| :--- | :--- | :--- |
| **Single Page Application (SPA)** | Aplicação construída sem navegação entre páginas externas ou recarregamentos de página. | [`src/App.jsx`](src/App.jsx) |
| **API JSON Aberta via AJAX** | Requisição `fetch()` assíncrona consumindo dados em tempo real da API pública da NHTSA. | [`src/services/carApi.js`](src/services/carApi.js) |
| **Hook: `useReducer`** | Gerenciamento do estado global da aplicação (busca, carregamento, erros e modal). | [`src/App.jsx`](src/App.jsx) |
| **Hook: `useMemo`** | Filtragem otimizada da lista de carros por categoria sem reprocessar o vetor a cada render. | [`src/App.jsx`](src/App.jsx) |
| **Hook: `useRef`** | Referência direta ao input de texto para controle de foco do campo de busca. | [`src/App.jsx`](src/App.jsx) |
| **Recurso: `createPortal`** | Janela modal de detalhes renderizada diretamente na div `#modal-root`. | [`src/components/Modal.jsx`](src/components/Modal.jsx) |
| **Biblioteca Externa** | `lucide-react` para os ícones da interface. | [`package.json`](package.json) |

---

## 3. Divisão de Tarefas da Equipe

- **Integrante 1**: Estrutura da SPA, componentes de interface e estilização CSS ([`src/App.jsx`](src/App.jsx), [`src/index.css`](src/index.css)).
- **Integrante 2**: Lógica de gerenciamento de estado com `useReducer`, `useMemo`, `useRef` e Modal com `createPortal` ([`src/components/Modal.jsx`](src/components/Modal.jsx)).
- **Integrante 3**: Implementação do serviço AJAX (`fetch`), integração com a API JSON e documentação ([`src/services/carApi.js`](src/services/carApi.js)).

---

## 4. Ferramentas Utilizadas
- React 19 / Vite
- AJAX (fetch API nativa)
- CSS3 (Vanilla)
- Lucide React

---

## 5. Como Executar

```bash
npm install
npm run dev
```
