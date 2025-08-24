# SmartCommerce

Uma aplicação de e-commerce moderna construída com React e Vite.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd SmartCommerce
```

2. Instale as dependências:
```bash
npm install
```

## Executando a Aplicação

1. Para iniciar o servidor de desenvolvimento (frontend em http://localhost:3000):
```bash
npx vite --port 3000
```

2. Configure a URL do backend (API) via variável de ambiente antes de iniciar o Vite (padrão: http://localhost:5000):
```bash
export VITE_BACKEND_URL=http://localhost:5000
npx vite --port 3000
```
Se preferir, defina em tempo de execução no navegador: `window.__API_BASE__ = 'http://localhost:8080'`.

O Vite está configurado para proxy de `/produtos` para `VITE_BACKEND_URL` (padrão `http://localhost:5000`) durante o desenvolvimento.

2. Abra seu navegador e acesse:
```
http://localhost:3000
```

## 🌐 Acesso aos Serviços

| Serviço     | URL de Acesso                               |
| ----------- | ------------------------------------------- |
| Frontend    | http://localhost:3000                        |
| Backend API | http://localhost:5000/swagger/index.html     |
| PostgreSQL  | http://localhost:5432                        |

Conexão do banco (exemplo):

```
Host=db;Port=5432;Database=productsdb;Username=postgres;Password=postgres
```

## Scripts Disponíveis

- `npx vite` - Inicia o servidor de desenvolvimento
- `npx vite build` - Cria uma versão otimizada para produção
- `npx vite preview` - Visualiza a versão de produção localmente

## Estrutura do Projeto

```
SmartCommerce/
├── client/           # Frontend da aplicação
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── contexts/    # Contextos React
│   │   ├── hooks/       # Hooks personalizados
│   │   ├── pages/       # Páginas da aplicação
│   │   └── types/       # Definições de tipos TypeScript
├── server/           # Backend da aplicação
└── shared/           # Código compartilhado entre frontend e backend
```